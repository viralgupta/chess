const express = require('express')
const {registerUser, loginUser, getUser} = require('./usercontroller')
const {protect} = require('../middlewear/authMiddleware')

const userRoutes = express.Router()

userRoutes.route('/signup').post(registerUser)
userRoutes.route('/login').post(loginUser)
userRoutes.route('/searchuser').get(protect, getUser)

module.exports= userRoutes



