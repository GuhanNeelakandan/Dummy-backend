const express = require('express')
const { createStudent, getAllStudent, getStudent, updateStudent, deleteStudent } = require('../controller/student')
const { authorization } = require('../Middleware/Auth')

const router = express.Router()


router.route('/create/student').post(authorization,createStudent)
router.route('/get/all/student').get(authorization,getAllStudent)
router.route('/get/student/:id').get(authorization,getStudent)
router.route('/update/student/:id').put(authorization,updateStudent)
router.route('/delete/student/:id').delete(authorization,deleteStudent)
module.exports=router;