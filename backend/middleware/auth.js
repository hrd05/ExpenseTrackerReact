const jwt = require('jsonwebtoken');
const User = require('../models/user');

require('dotenv').config();
const authenticate = (req, res, next) => {
    // console.log('in the middleware')

    const token = req.header('Authorization');
    //console.log(token);
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    // console.log(user.userId);

    User.findById(user.userId)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
};

module.exports = {
    authenticate
};
