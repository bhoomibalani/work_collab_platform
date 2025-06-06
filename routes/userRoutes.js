const express = require('express');
const {signupController, loginController}=require('../controllers/userController')

const router = express.Router();

//routes
//signup route
router.post('/signUp',signupController);
//login route
router.post('/login',loginController);



module.exports=router;