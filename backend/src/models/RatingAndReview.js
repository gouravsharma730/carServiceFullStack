const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    content:{type:String,required:true},
    rating:{type:Number, min:0,max:5},
    createdAt:{type:Date,default:Date.now},
    comments:[{
        user:{type:String,required:true},
        content:{type:String,required:true},
        createdAt:{type:Date,default:Date.now}
    }],
    likes:[{type:String}],
    dislikes:[{type:String}]
})

module.exports =mongoose.model('Reviews',reviewSchema);