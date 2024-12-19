const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User=require('../models/user');
const jwt=require('jsonwebtoken');
const sendEmail=require('../utils/sendEmail');
const nodemailer = require('nodemailer');
require('dotenv').config();



const authControllers={

      register: async (req, res) => {   
        const { email, password } = req.body;   
        const user = await User.findOne({ email });
        if (user) {
          return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({ email, password });  
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });   
      },
      login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        return res
          .status(200)
          .json({ message: "Login successful", token });
      },


    //    forgotPassword:async(req,res)=>{
    //     const { email } = req.body;

    //     // Check if user exists
    //     const user = await User.findOne({ email });
    //     if (!user) {
    //       return res.status(404).json({ message: 'User not found' });
    //     }
      
    //     // Create a reset token
    //     const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      
    //     // Generate the reset link
    //     const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
    //     // Send reset email
    //     try {
    //       await sendEmail(email, resetLink);
    //       res.status(200).json({ message: 'Password reset email sent' });
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: 'Error sending email' });
    //     }
    //   },

    //   resetPassword:async(req,res)=>{

    //   const { token, newPassword } = req.body;

    //   if (!token || !newPassword) {
    //     return res.status(400).json({ message: 'Token and new password are required.' });
    //   }
    
    //   try {
    //     // Verify the token
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    //     // Find the user by email (from the token)
    //     const user = await User.findOne({ email: decoded.email });
    
    //     if (!user) {
    //       return res.status(400).json({ message: 'Invalid token or user not found' });
    //     }
    
    //     // Hash the new password
    //     const hashedPassword = await bcrypt.hash(newPassword, 10);
    //     user.password = hashedPassword;
    
    //     // Save the updated user password
    //     await user.save();
    
    //     res.json({ message: 'Password reset successfully.' });
    //   } catch (error) {
    //     res.status(400).json({ message: 'Invalid or expired token' });
    //   }
    // }  






     forgotPassword : async (req, res) => {
      const { email } = req.body;
    
      try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        // Generate a reset token
        const resetToken = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } // Token expires in 1 hour
        );
    
        // Create the reset link
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
        // Send email using Nodemailer
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Or another email provider
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
    
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Password Reset Request',
          html: `<p>Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
        });
    
        res.status(200).json({ message: 'Reset link sent to your email' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
      }
    },
    
    // Reset password - Update user's password
     resetPassword : async (req, res) => {
      const { token, newPassword } = req.body;
    
      if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required.' });
      }
    
      try {
        // Verify the reset token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
    
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
    
        res.status(200).json({ message: 'Password reset successfully!' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Invalid or expired token' });
      }
    }
};



module.exports=authControllers;