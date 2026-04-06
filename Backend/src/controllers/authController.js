const redisClient = require('../config/redis');
const User =require('../models/schema');
const validate=require('../utils/validator');
const bcrypt=require('bcryptjs');

 const jwt = require('jsonwebtoken');

const CreateAccount = async (req,res) => {
    try{
        validate(req.body);
        const {firstName ,emailId ,passWord} = req.body;
        
     const existingUser = await User.findOne({ emailId });
     req.body.role ="patient";

      if (existingUser) {
      return res.status(400).json("User already exists");
      }
       
      req.body.passWord = await bcrypt.hash(passWord, 10);
   

       const user =await User.create(req.body);
       
       const reply = {
        firstName:user.firstName,
        emailId:user.emailId,
        _id:user._id,
       };
       

       const token =  jwt.sign({_id: user._id,emailId:emailId,role:user.role},process.env.JWT_KEY,{expiresIn:'1h'});
       res.cookie('token',token,{maxAge:60*60*1000,});
        res.status(200).json({
         user:reply,
         token: token, 
         message:" Registration sucessfully"

        });
    }
    catch(err){
        res.status(400).send("error" +err.message);

    }
}



const login = async (req,res) => {

    try{
    const {passWord ,emailId} = req.body;
   

    if(!emailId)
        throw new Error ('inavalid crendentials');
    if(!passWord)
        throw new Error ('inavalid crendentials');
     const user =  await User.findOne({emailId});
      if (!user) {
            throw new Error('Invalid credentials');
        }
    const match =  await bcrypt.compare(passWord,user.passWord);

    if(!match)
        throw new Error ("invalid crendtials")
    const reply = {
        firstName:user.firstName,
        emailId:user.emailId,
        _id:user._id,
    }

    const token =  jwt.sign({_id: user._id,emailId: emailId,role:user.role},process.env.JWT_KEY,{expiresIn:'1h'});
       res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).json({
         user:reply,
         message:"login sucessfully"

        });
    

}
catch(err){
    res.status(401).send("err"+err.message);
}
};
const logout = async (req, res) => {
  try {

    const { token } = req.cookies;

    if (token) {
      const payload = jwt.decode(token);

      await redisClient.set(`token:${token}`, "blocked");
      await redisClient.expireAt(`token:${token}`, payload.exp);
    }

    res.clearCookie("token");

    res.send("Logout successfully");

  } catch (err) {
    res.status(500).send("error " + err.message);
  }
};
const checkUser = (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const reply = {
        firstName: req.user.firstName,
        emailId: req.user.emailId,
        _id: req.user._id,
        role: req.user.role,
        image: req.user.image
    };

    res.status(200).json({
        user: reply,
        message: 'Valid User'
    });
};



module.exports = { CreateAccount, login, logout, checkUser};