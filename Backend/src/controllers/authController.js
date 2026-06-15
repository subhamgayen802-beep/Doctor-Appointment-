const redisClient = require("../config/redis");
const User =  require("../models/user")
const validate = require('../utils/validator');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const register = async (req,res)=>{
       

    try{
   
      
      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);
      req.body.role = 'patient'
 
      const user = await User.create(req.body);

      const token =  jwt.sign({_id:user._id , emailId:emailId, role:'user'},process.env.JWT_KEY,{expiresIn: 60*60});
      const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role:user.role,
    }
    
     
    res.cookie('token', token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true,   
      sameSite: 'none', 
      secure: true,   // localhost false,production true
    });
     res.status(201).json({
        user:reply,
        message:"Loggin Successfully"
    })
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
}

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log('Login attempt:', emailId); // ← যোগ করো

    const user = await User.findOne({ emailId });
    console.log('User found:', !!user); // ← যোগ করো

    if (!user) throw new Error("Invalid Credentials");

    const match = await bcrypt.compare(password, user.password);
    console.log('Password match:', match); // ← যোগ করো

    if (!match) throw new Error("Invalid Credentials");
    // বাকি code...

  } catch (err) {
    console.error('Login error:', err.message); // ← যোগ করো
    res.status(401).json({ message: err.message });
  }
};

const logout = async(req,res)=>{

    try{
        const {token} = req.cookies;
        const payload = jwt.decode(token);


        await redisClient.set(`token:${token}`,'Blocked');
        await redisClient.expireAt(`token:${token}`,payload.exp);
    
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.send("Logged Out Succesfully");

    }
    catch(err){
       res.status(503).send("Error: "+err);
    }
}


const adminRegister = async(req,res)=>{
    try{
   
      validate(req.body); 
      const {firstName, emailId, password}  = req.body;

      req.body.password = await bcrypt.hash(password, 10);

    
     const user =  await User.create(req.body);
     const token =  jwt.sign({_id:user._id , emailId:emailId, role:user.role},process.env.JWT_KEY,{expiresIn: 60*60});
     res.cookie('token',token,{maxAge: 60*60*1000});
     res.status(201).send("User Registered Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err);
    }
}



module.exports = {register, login,logout,adminRegister};