const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: String,
  email: { type: String, unique: true },
  password:String,
  phoneNumber:String,
  address:String,
  bookingHistory:[{
    data:Date,
    carDetails:String,
  }],
  bookingCount:{type:Number,default:0}
});

module.exports = mongoose.model('User',userSchema);
