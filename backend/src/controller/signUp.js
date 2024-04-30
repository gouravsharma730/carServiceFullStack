const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../../utils/email');

const path = require('path');
let htmlFilePath = path.join(__dirname,'../../static/signup.html');

const signUp = async function(req,res){
    try{
        if (!req.body.userName || !req.body.email || !req.body.password){
            return res.status(400).json({ error: 'Missing input in request body!' });
        }
        const {userName,password,email,address,phoneNumber}= req.body;
        const checkUser= await User.find({email:email});
        if(checkUser.length==1)return res.status(409).json({message:"This Email is already registered with us."});
        let hashedPassword = await bcrypt.hash(password,10);
        let user = new User({userName,email,password:hashedPassword,address,phoneNumber});
        await user.save();
        const token = jwt.sign({ _id: user._id }, 'your_secret_key', { expiresIn: '700h' });
        const message =[{message:`Hi ${userName}, Signup successful!!`}]
        const subject='Welcome to SpeedyShine - Confirm Your Registration';
        const text =`Hello ${userName}, this is a confirmation email.`;
        const mailCheck = await sendEmail(email,subject,text,htmlFilePath,userName);
        return res.status(201).json({message,token});
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}

module.exports={signUp}