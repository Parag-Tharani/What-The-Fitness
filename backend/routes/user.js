const express = require("express")
const { registerUser, login, userDetails, allUsers } = require("../handlers/user")

const UserRoute = express.Router()

UserRoute.post('/register', registerUser)
UserRoute.post('/login', login )
UserRoute.post('/userDetails', userDetails)
UserRoute.get("/allUsers", allUsers)

module.exports = UserRoute