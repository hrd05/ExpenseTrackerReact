const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

exports.sendMailToVerify = async (email, token) => {

    const verificationLink = `http://localhost:3000/verify-email?token=${token}&email=${email}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify your email',
        text: `Please verify your email by following link ${verificationLink}`
    }

    try {
        const result = await transporter.sendMail(mailOptions);
        if (result) {
            console.log("Email sent successfully");

        }
    }
    catch (err) {
        console.log(err);
    }

}

