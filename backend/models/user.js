
const { Schema, default: mongoose } = require('mongoose');
const { stringify } = require('uuid');

const userSchema = new Schema({

    fullName: {
        type: String,
    },
    photoUrl: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    totalExpense: {
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);





// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     isPremiumUser: Sequelize.BOOLEAN,
//     totalExpense: Sequelize.INTEGER
// });

// module.exports = User;
