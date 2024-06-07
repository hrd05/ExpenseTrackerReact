
const path = require('path');
const nodemailer = require('nodemailer');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Forgotpassword = require('../models/forgot-password');
require('dotenv').config();
// const { ObjectId } = require('mongoose');
const { ObjectId } = require('mongodb');
// require('dotenv').config();


// const getforgotpassword = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'reset.html'));
// }

const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service provider here
    auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD // your email password or an app-specific password
    }
});

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const id = uuid.v4();
            await Forgotpassword.create({ _id: id, active: true, userId: user._id })
            // user.createForgotpassword({ id, active: true }).catch((err) => {
            //     throw new Error(err);
            // });

            // console.log(id);
            // Configure email details
            const mailOptions = {
                from: 'harshdunkhwal55@gmail.com', // Replace with your email address
                to: email,
                subject: 'Password Reset',
                text: 'Click the following link to update your password',
                html: `<a href="http://localhost:3000/password/resetpassword/${id}">Reset password</a>`,
            };

            // Send the email using nodemailer
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Failed to send email', success: false });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.status(200).json({ message: 'Link to reset password sent to your mail', success: true });
                }
            });
        } else {
            throw new Error('User doesnt exist');
        }
    } catch (err) {
        console.error(err);
        return res.json({ message: err.message, success: false });
    }
};

// The rest of your code remains unchanged
const resetpassword = (req, res) => {
    const id = req.params.id;
    // console.log(id, 'reset password');
    Forgotpassword.findOneAndUpdate({ _id: id }, { $set: { active: false } }).then(forgotpasswordrequest => {
        if (forgotpasswordrequest) {
            // forgotpasswordrequest.update({ active: false });
            return res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>

                                    <form action="/password/updatepassword/${id}" method="get">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`
            )
            res.end()

        }
    })
}

const updatepassword = (req, res) => {

    try {
        const { newpassword } = req.query;
        const { resetpasswordid } = req.params;
        Forgotpassword.findOne({ _id: resetpasswordid }).then(resetpasswordrequest => {

            User.findOne({ _id: resetpasswordrequest.userId }).then(user => {
                // console.log('userDetails', user)
                if (user) {
                    //encrypt the password

                    const saltRounds = 10;
                    bcrypt.genSalt(saltRounds, function (err, salt) {
                        if (err) {
                            console.log(err);
                            throw new Error(err);
                        }
                        bcrypt.hash(newpassword, salt, function (err, hash) {
                            // Store hash in your password DB.
                            if (err) {
                                console.log(err);
                                throw new Error(err);
                            }
                            User.updateOne({ _id: user._id }, { password: hash })
                                .then(() => {
                                    res.status(201).json({ message: 'Successfuly update the new password' })
                                })
                        });
                    });
                } else {
                    return res.status(404).json({ error: 'No user Exists', success: false })
                }
            })
        })
    } catch (error) {
        return res.status(403).json({ error, success: false })
    }

}

module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword,
};