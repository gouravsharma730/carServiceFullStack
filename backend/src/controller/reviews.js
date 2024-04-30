const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Reviews = require('../models/RatingAndReview')


const sendReview = async function(req,res){
    let content = req.body.comment;
    let userName = req.user.userName;
    let rating = req.body.rating;
    if(!req.body.comment) return res.status(400).json({message:"Please add comment!"});
    const reviews = new Reviews({content,userName,rating});
    reviews.save();
    return res.status(200).json({message:"Thank you for your review."});
}

const getReviews =  async function (req,res){
    const reviews = await Reviews.find({});
    return res.status(200).json({message:reviews});
}

const commentOnReview = async function(req,res){
    try{
        const comments = req.body;
        comments.user = req.user.id; 
        const _id = req.body.reviewId;
        const review = await Reviews.findOneAndUpdate({_id},
            {$push:{
                comments:comments
            }},{new:true});
        return res.status(200).json({message:review});
    }catch(error){
        return res.status(400).json({message:error.message});
    }
}

const likeOnreview = async function(req,res){
    try{
        const user = req.user.id;
        const _id = req.body._id;
        let checkReview= await Reviews.findById({_id});
        if(!checkReview) return res.status(404).json({message:"Review not found"});
        let liked = checkReview.likes.includes(user);
        let incLike;
        if(liked){
            incLike = await Reviews.findOneAndUpdate({_id},
                {$pull:{
                    likes:user
                }},{new:true});
        }else{
            incLike = await Reviews.findOneAndUpdate({_id},
                {$push:{
                    likes:user
                }},{new:true});
            }
            return res.status(200).json({message:incLike.likes});
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

const disLikeOnReview = async function(req,res){
    try{
        const user = req.user.id;
        const _id = req.body._id;
        let checkReview = await Reviews.findById({_id});
        if(!checkReview) return res.status(404).json({message:"Review not found"});
        let disliked = checkReview.dislikes.includes(user);
        let incDislikes;
        if(!disliked){
            incDislikes= await Reviews.findOneAndUpdate({_id},
                {$push:{
                    dislikes:user
                }},{new:true});
        }else{
            incDislikes= await Reviews.findOneAndUpdate({_id},
                {$pull:{
                    dislikes:user
                }},{new:true});
            }
        return res.status(200).json({message:incDislikes.dislikes});
    }catch(error){
        return res.status(400).json({message:error.message})
    }
}

module.exports={sendReview,getReviews, commentOnReview, likeOnreview, disLikeOnReview}