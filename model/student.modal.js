const mongoose =require('mongoose')


const studentSchema =mongoose.Schema({
    firstname:{type:String,require:true},
    lastname:{type:String,require:true},
    email:{type:String,require:true},
    mobile:{type:Number},
    password:{type:String,require:true},
    age:{type:Number}
})

const Student = mongoose.model('Students',studentSchema)

module.exports= Student