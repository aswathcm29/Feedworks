const User  = require('../models/userModel')
const bcrypt = require('bcrypt')
const {generateToken} = require('../utils/helper.service')

const signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await User.findOne({ $or: [{email:email},{username:username}]});
      if (user) {
        return res.status(400).json({ error: true, message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword
      });
      await newUser.save();
      const token = generateToken(newUser.username, newUser.email);
      return res.status(201).json({ error: false, message: "User created successfully", token: token });
    } catch (err) {
      return res.status(500).json({ error: true, message: err.message });
    }
  }
  


const login = async(req,res)=>{
    try{
        const {username,password} = req.body;
        const user = await User.findOne({username:username})
        console.log(user)
        if(!user){
          return res.status(400).json({error:true,message:"User not found"})
        }
        const validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword){
            return res.status(400).json({error:true,message:"Invalid password"})
        }
        const token = generateToken(user.username,user.email)
        res.status(200).json({_id:user._id,username:user.username,email:user.email,token:token})
    }catch(err){
        res.status(400).json({error:true,message:"Login failed"})
    }
}
 
const getuser = async(req,res)=>{
    try{
        const user = await User.findOne({username:req.user.username})
        res.status(200).json(user)
    }catch(err){
        res.status(400).json({error:true,message:err.message})
    }
}
module.exports = {login,signup,getuser};