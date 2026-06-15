const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const {
    register,
    login,
    logout
    
   
} = require('../controllers/authController');

router.post('/register',register ); 
router.post('/login', login);
router.post('/logout',protect(), logout);
router.get('/check',protect(),(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})

module.exports = router;