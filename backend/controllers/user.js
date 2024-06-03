
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const DownloadHistory = require('../models/download-history');
// const { where } = require('sequelize');
const { response } = require('express');
const { default: mongoose } = require('mongoose');


exports.getSignup = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'signup.html'));
};

exports.postSignup = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password, 'in postSigpup');

    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(409).json({ message: 'user with same email aleady exists' });
        }
        else {
            const hash = await bcrypt.hash(password, 10);
            if (hash) {
                await User.create({ email: email, password: hash })
                res.status(201).json('User created successfully');
            }
            else {
                throw new Error('Error creating user');
            }
        }
    }
    catch (err) {
        console.log(err);
    }
};

// exports.getLogin = (req, res) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
// };

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, 'd3ec4a17b9e89ca0527bba8eab6b546c3c75931f3c245a81503c81732d9d8ef4');
};



exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password, 'post login');

    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        const result = await bcrypt.compare(password, user.password)

        if (result) {
            res.status(200).json({ message: 'User logged succesfully', token: generateAccessToken(user.id), user });
        }
        else {
            res.status(401).json({ message: 'incorrect password' });
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'something went wrong' });
    }
};

exports.postCompleteProfile = async (req, res) => {

    const { fullName, url } = req.body;
    const id = req.user._id;

    try {
        // console.log(fullName, url, id);
        if (fullName && url) {
            const user = await User.findByIdAndUpdate(id, { fullName: fullName, photoUrl: url })
            console.log(user);
            res.status(201).json({ message: 'profile updated' });
        }

    }
    catch (err) {
        console.log(err);
    }
}


exports.postFileUrl = (req, res) => {
    const fileUrl = req.body.fileURL;
    const userId = req.body.userId;

    // console.log(fileUrl, 'in post file url');
    DownloadHistory.create({ fileUrl: fileUrl, userId: userId })
        .then((response) => {
            res.status(201).json({ seccess: true });
        })
        .catch(err => {
            console.log(err);
        })

}

exports.getDownloadHistory = (req, res) => {
    DownloadHistory.find({ userId: req.user.id })
        .then((response) => {
            res.status(201).json(response);
        })
        .catch(err => console.log(err));
}