const express = require('express');
const router = express.Router();

const protect = require('../middleware/authMiddleware');
const {
    CreateAccount,
    login,
    logout,
    checkUser,
   
} = require('../controllers/authController');

router.post('/register', CreateAccount); 

router.post('/login', login);




router.post('/logout',protect(), logout);
router.get('/me' ,protect(), checkUser);

module.exports = router;