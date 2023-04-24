const mongoose =require('mongoose')


const userSchema =mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true},
    mobile:{type:Number},
    password:{type:String,require:true},
    otp:{type:Number,default:""},
    otpVerified:{type:Boolean,default:false}
})

const User = mongoose.model('users',userSchema)

module.exports= User