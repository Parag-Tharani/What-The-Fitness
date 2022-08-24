const UserData = require("../database/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET = "thisissecretforwhatthefitnessbackendapp"


async function registerUser(req,res){
    const { payload } = req.body
    const passReg = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-])(?=.{8,})')


    let existingEmail = null
    let existingMobile = null

    existingEmail = await UserData.findOne({email:payload.email})
    existingMobile = await UserData.findOne({mobile:payload.mobile})


    if(existingEmail && existingMobile){
        return res.status(501).send("Email && Mobile Number already registered")
    }
    else if(existingEmail && existingMobile === null ){
        return res.status(501).send("Email already registered")
    }
    else if(existingEmail === null && existingMobile ){
        return res.status(501).send("Mobile Number already registered")
    }else{

        if(payload.mobile.length === 10){
        if(payload.password.match(passReg)){
        
            payload.password = await bcrypt.hash(payload.password,10)

            await UserData.create(payload)
            .then(() => {return res.send("Account Created Successfully")})
            .catch((err) => {return res.status(501).send(err)})

        }else{
            return res.status(501).send('Password must have minimum 8 characters with atleast one special character and one capital alphabet.')
        }
        }
        else{
            return res.status(501).send("Please enter a valid mobile number")
        }
    }
}


async function login(req,res){
    const { email, password, role } = req.body

    let existingEmail = null

    existingEmail = await UserData.findOne({email})

    if(existingEmail){
        
        if(existingEmail.role === role){

            await bcrypt.compare(password,existingEmail.password)
            .then((boolean) => {

                if(boolean){

                    let token = jwt.sign({
                        id: existingEmail._id,
                        email:existingEmail.email
                    }, SECRET,{
                        expiresIn: "30 days"
                    })
                    
                    return res.json({
                        status:200,
                        message: "Logged in successfully",
                        data: existingEmail,
                        token: token
                        })

                }else{
                    return res.status(501).send("Incorrect Password")
                }
                
            })
            .catch((err) => { return res.status(501).send(err) })
                
        }else{
            return res.status(501).send("Email not belongs to you.")
        }
    }
    else{
        return res.status(501).send("Email does not found in database")
    }
}


async function userDetails(req,res){
    const { token } = req.body

    try {

    let decoded_token = jwt.decode(token, SECRET)
    
    let existingUser = null
    existingUser = await UserData.findOne({_id:decoded_token.id})
    
    if(existingUser){
        return res.send(existingUser)
    }else{
        return res.status(501).send("User not found")
    }

    } catch (error) {
        return res.status(401).send("Invalid Token / Expired Token")
    }
    
}


async function allUsers(req,res){
    const { name , email , mobile , status , role} = req.query

    let existingUser = await UserData.find({$or:[ {first_name:name} , {email} , {mobile} , {status} ,{role}]})

    return res.send(existingUser)
    
}


module.exports = {
    registerUser,
    login,
    userDetails,
    allUsers
}