const mongoose = require('mongoose');
 const bookingSchema = new mongoose.Schema({
    carDetails:{
        ownerId:String,
        carNumber:String,
        carModel:String,
        serviceType:{
            type:String,
            default:"Full service"
        },
        serviceStatus:{
            type:String,
            default:"Awaiting Confirmation"
        }
    },
    address:String,
    dateOfPickUp: Date,
    pickUpAddress:String,
    dateOfService:Date,
    dateOfCarDrop:Date,
    serviceStatus:{type:String,default:'Awaiting Confirmation'},
    bookingTime: {type:Date, default:Date.now}
 })

module.exports= mongoose.model("BookService",bookingSchema);