const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

const homePage = async function(req,res){
    try{
        const _id= req.user.id;
        const profileData = await User.find({_id});
        return res.status(201).json({message:profileData})
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports = {homePage}