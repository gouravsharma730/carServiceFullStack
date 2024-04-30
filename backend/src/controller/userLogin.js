const express = require('express');
router = express.Router();
const path = require('path');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const verifyToken = require('../middleware/verifyToken');
const Booking = require('../models/Booking');

const login =  async function(req,res){
    try{
        if (!req.body || !req.body.email || !req.body.password){
            return res.status(400).json({ error: 'Missing email in request body!' });
        }
        const email=req.body.email;
        const userCheck = await User.find({email:email});
        if(!userCheck[0]){
         return res.status(201).json({message:"User not found."});
        }
        const matchPassword = await bcrypt.compare(req.body.password,userCheck[0]['password']);
        if(!matchPassword) return res.status(201).json({message:"Incorrect password"});
        const token = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: Math.floor(Date.now() / 1000) + (36500 * 24 * 60 * 60) });
        const message = userCheck;
        return res.status(201).json({message,token});
    }catch(error){
        return res.status(500).json({message: error.message});
    }
}

const logout = async function(req,res){
    res.clearCookie('jwtToken');
    res.status.json({message:"Logout successfully."});
}


module.exports = {login, logout};