const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const BookService = require("../models/Booking");
const User = require("../models/User");
const sendEmail = require('../../utils/email');
const path = require("path");
const htmlFilePath = path.join(__dirname, "../static/confirmBooking.html");

const bookService = async function(req, res) {
    try {
      const bookingDetails = req.body;
      bookingDetails.carDetails.ownerId = req.user.id;
      const booking = new BookService(bookingDetails);
      await booking.save();
      const user = await User.findOneAndUpdate(
        { _id: req["user"]["id"] },
        {
          $push: {
            bookingHistory: {
              date: new Date(),
              carDetails: bookingDetails.carDetails.carNumber,
            },
          },
          $inc: { bookingCount: 1 },
        },
        { new: true }
      );
      const subject = " Car Wash Request Received - Confirmation Pending";
      const emailCheck = await sendEmail(
        req.user.email,
        subject,
        "",
        htmlFilePath,
        req.body.userName
      );
      return res.status(200).json({ message: booking });
    } catch (err) {
      return res.status(500).json({message:"Internal server error"});
    }
  }

  const getBookingHistory = async function(req, res) {
    try {
      const ownerId = req.user.id;
      let response = [];
      const bookingHistory = await BookService.find({
        "carDetails.ownerId": ownerId,
      });
      for (let i = 0; i < bookingHistory.length; i++) {
        let temp = {};
        const fullDate = new Date(bookingHistory[i]["dateOfPickUp"]);
        let date = fullDate.getDate();
        let month = fullDate.getMonth() + 1;
        let year = fullDate.getFullYear();
        temp.carNumber = bookingHistory[i]["carDetails"]["carNumber"];
        temp.serviceType = bookingHistory[i]["carDetails"]["serviceType"];
        temp.serviceStatus = bookingHistory[i]["carDetails"]["serviceStatus"];
        temp.dateOfPickUp = `${year}-${month < 10 ? "0" : ""}${month}-${
          date < 10 ? "0" : ""
        }${date}`;
        temp._id = bookingHistory[i]["id"];
        response.push(temp);
      }
      // console.log(response);
      return res.status(200).json({ message: response });
    } catch (err) {
      return res.status(500).json({message:"Internal server error"});
    }
  }

  module.exports = {bookService, getBookingHistory}