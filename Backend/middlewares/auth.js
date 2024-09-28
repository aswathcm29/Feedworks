const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const checkUser  = async(req,res,next)=>{
    try{
      const from_header = req.headers.authorization;
        if(!from_header){
            return res.status(401).json({error:true,message:"Unauthorized"})
        }
        const token = req.headers.authorization.split(" ")[1];
    
        jwt.verify(token,process.env.JWT_SECRET,async(err,user)=>{
            if(err){
                return res.status(401).json({error:true,message:"Unauthorized"})
            }
            const doc = await User.findOne({username:user.username})
            if(!doc){
                return res.status(400).json({error:true,message:'Invalid user'})
            }
            req.user = {username:doc.username,email:doc.email}
            next();
        })
    }catch(err){
        console.log(err.message)
        return res.status(400).json({error:true,message:err.message})
    }
}

module.exports = {checkUser};