const express = require('express')
const { register, login, forgotPassword, verifyOTP, resetPassword } = require('../controller/user')
const { verifyUser } = require('../Middleware/Auth')

const router = express.Router()

router.route('/user/register').post(register)
router.route('/user/login').post(login)
router.route('/verify/user').post(verifyUser)
router.route('/forgot/password').post(forgotPassword)
router.route('/verify/otp').post(verifyOTP)
router.route('/reset/password').post(resetPassword)

module.exports=router