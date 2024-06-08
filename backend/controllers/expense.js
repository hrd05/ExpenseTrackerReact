
const path = require('path');
const Expense = require('../models/expense');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const sequelize = require('../util/database');
const S3Services = require('../services/S3services');


const { response } = require('express');


// exports.getExpenseForm = (req, res, next) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'Expense.html'));
// };




exports.getDownload = async (req, res) => {

    try {
        const expenses = await Expense.find({ userId: req.user })
        //upload to s3
        //convert it to string uploading as a text file
        const userId = req.user._id;
        const stringifiedExpenses = JSON.stringify(expenses);
        const fileName = `Expenses${userId}/${new Date()}.txt`;
        const fileURL = await S3Services.uploadToS3(stringifiedExpenses, fileName);

        // console.log(fileURL);
        res.status(201).json({ fileURL, userId, success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'something went wrong' });
    }



}

exports.postExpense = async (req, res) => {
    const { amount, category, description } = req.body;

    try {
        const expense = await Expense.create({ amount: amount, category: category, description: description, userId: req.user._id })
        const total_Expense = Number(req.user.totalExpense) + Number(amount);

        await User.findByIdAndUpdate(req.user, { $set: { totalExpense: total_Expense } })

        return res.status(201).json(expense);
    }
    catch (err) {
        console.log(err);
    }

}

exports.updateExpense = async (req, res) => {
    const id = req.params.id;
    const { amount, category, description } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(id, { $set: { amount: amount, category: category, description: description } });
        console.log(expense);
        const updateExpense = Number(req.user.totalExpense) + (Number(amount) - Number(expense.amount));
        await User.findByIdAndUpdate(req.user, { $set: { totalExpense: updateExpense } });
        res.status(201).json('successfully updated');

    }
    catch (err) {
        console.log(err);
        res.status(500).json('internal server error');
    }
}



exports.getExpenses = async (req, res) => {

    // const pageSize = Number(req.query.pageSize);
    // const page = Number(req.query.page) || 0;
    // console.log(pageSize, page);

    try {

        // const isPremium = req.user.isPremium;
        // const totalExpenses = await Expense.countDocuments({ userId: req.user })

        // const expenses = await Expense.find({ userId: req.user }).skip((page - 1) * pageSize).limit(pageSize)
        const expenses = await Expense.find({ userId: req.user });

        // console.log(expenses, totalExpenses);

        return res.status(201).json({
            expenses: expenses,
            // currentPage: page,
            // hasNextPage: totalExpenses - (page * pageSize) > 0,
            // nextPage: page + 1,
            // hasPreviousPage: page > 1,
            // previousPage: page - 1,
            // lastPage: Math.ceil(totalExpenses / pageSize),
            // isPremium: req.user.isPremium
        });
    }

    catch (err) {
        console.log(err);
    }



}

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    // const t = await sequelize.transaction();
    try {
        const expense = await Expense.findByIdAndDelete(id);
        const updateExpense = Number(req.user.totalExpense) - Number(expense.amount);
        await User.findByIdAndUpdate(req.user, { $set: { totalExpense: updateExpense } });
        return res.status(201).json({ message: 'success deletion' });
    }
    catch (err) {
        console.log(err);
    }
}



