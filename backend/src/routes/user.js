const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');

const loginController = require('../controller/userLogin');
const signUpController = require('../controller/signUp');
const profileUpdateController = require('../controller/profileUpdate');
const reviewController = require('../controller/reviews');
const homePageController = require('../controller/homePage');
const bookingController = require('../controller/booking');
const adminController = require('../controller/admin');

router.get('/home',verifyToken,homePageController.homePage);
router.post('/login',loginController.login);
router.post('/logout',verifyToken,loginController.logout);
router.post('/signup',signUpController.signUp);
router.post('/profileUpdate',verifyToken,profileUpdateController.profileUpdate);
router.post('/resetpassword',verifyToken,profileUpdateController.resetPassword);
router.post('/review', verifyToken, reviewController.sendReview);
router.get('/reviews',reviewController.getReviews);
router.post('/commentReview', verifyToken,reviewController.commentOnReview);
router.post('/likeReview',verifyToken,reviewController.likeOnreview);
router.post('/dislikeReview',verifyToken,reviewController.disLikeOnReview);
router.post('/forgetPassword',profileUpdateController.forgetPassword);
router.post('/newBooking', verifyToken,bookingController.bookService);
router.get('/bookingHistory', verifyToken,bookingController.getBookingHistory);
router.get('/adminHome',verifyToken,adminController.adminHome);
router.post('/bookingresponse',verifyToken,adminController.bookingResponse);


module.exports= router;
