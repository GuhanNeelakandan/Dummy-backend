const jwt = require('jsonwebtoken')
const User = require('../model/user.modal')

const authorization =async(req,res,next)=>{
    if(req.headers.authorization){
        let decode = jwt.verify(req.headers.authorization,'tokenkey')
        console.log(decode);
        if(decode){
            req.userId= decode.id
           if(req.userId!==""){
            let user=await User.findOne({_id:req.userId})
            
            if(user!==null){
                next()
            }else{
                res.json({
                    message:"unauthorized"
                })
            }
           }else{
            res.json({
                message:"user not found"
            })
           }
            
        }
    }else{
        res.json({
            message:"UnAuthorized"
        })
    }
}

const verifyUser =async(req,res,next)=>{
    if(req.body.token){
        let decode = jwt.verify(req.body.token,'tokenkey')
        if(decode){
            req.userId= decode.id
           if(req.userId!==""){
            let user=await User.findOne({_id:req.userId})
            
            if(user!==null){
                res.json({
                    status:1,
                    message:"Authorized"
                })
            }else{
                res.json({
                    status:0,
                    message:"unauthorized"
                })
            }
           }else{
            res.json({
                status:0,
                message:"user not found"
            })
           }
            
        }
    }else{
        res.json({
            status:0,
            message:"UnAuthorized"
        })
    }
}

module.exports={authorization,verifyUser}