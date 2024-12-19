const express=require('express');
const authControllers=require('../controllers/authController');
const authRouter=express.Router();



// Register route
authRouter.post("/register",authControllers. register);

// Login route
authRouter.post("/login", authControllers.login);

authRouter.post('/forgot-Password',authControllers.forgotPassword);

authRouter.post('/reset-Password',authControllers.resetPassword);



module.exports=authRouter;