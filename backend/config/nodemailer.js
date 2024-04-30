const nodemailer = require('nodemailer');

const email = process.env.Email;
const password = process.env.password;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password
    }
});

module.exports = transporter;