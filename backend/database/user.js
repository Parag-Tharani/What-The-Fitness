const mongoose = require("mongoose")
const { isEmail } = require("validator")
var sequenceGenerator = require('mongoose-sequence-plugin');

const UserSchema = new mongoose.Schema({
    // uid:{
    //     type:String
    // },
    first_name:{
        type:String,
        required: true,
    },
    last_name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required: true,
        lowercase:true,
        validate: [ isEmail , 'invalid email format' ]
    },
    mobile:{
        type:Number,
        trim:true,
        unique:true,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        required: true,
        enum: ['admin', 'member', 'trainer']
    },
    status:{
        type:String,
        required: true,
        enum:['active','inactive']
    }

})

// UserSchema.plugin(sequenceGenerator, {
//     field: 'uid',
//     startAt: 'RaN23Al24phaN',
//     maxSaveRetries: 2
// });

const UserData = mongoose.model("UserSchema", UserSchema)

module.exports = UserData