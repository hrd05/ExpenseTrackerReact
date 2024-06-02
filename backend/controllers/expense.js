
const path = require('path');
const Expense = require('../models/expense');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
// const sequelize = require('../util/database');
const S3Services = require('../services/S3services');


const { response } = require('express');


exports.getExpenseForm = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Expense.html'));
};




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


// exports.postExpense = async (req, res, next) => {
//     const amount = req.body.amount;
//     const category = req.body.category;
//     const description = req.body.description;

//     const t = await sequelize.transaction();
//     // console.log(t);
//     // console.log(req.user);

//     const id = req.user.id


//     Expense.create({ amount, category, description, userId: id }, { transaction: t })

//         .then((expense) => {
//             const total_Expense = Number(req.user.totalExpense) + Number(amount);
//             User.update({
//                 totalExpense: total_Expense
//             }, {
//                 where: { id: req.user.id },
//                 transaction: t
//             })
//                 .then(async () => {
//                     await t.commit();
//                     res.status(201).json(expense);
//                 })
//                 .catch(async (err) => {
//                     await t.rollback();
//                     return res.status(500).json(err);
//                 })
//         })
//         .catch(async (err) => {
//             await t.rollback();
//             return res.status(500).json(err);
//         })

// }



exports.getExpenses = async (req, res) => {

    const pageSize = Number(req.query.pageSize);
    const page = Number(req.query.page) || 0;
    // console.log(pageSize, page);

    try {

        const isPremium = req.user.isPremium;
        const totalExpenses = await Expense.countDocuments({ userId: req.user })

        const expenses = await Expense.find({ userId: req.user }).skip((page - 1) * pageSize).limit(pageSize)

        // console.log(expenses, totalExpenses);

        return res.status(201).json({
            expenses: expenses,
            currentPage: page,
            hasNextPage: totalExpenses - (page * pageSize) > 0,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalExpenses / pageSize),
            isPremium: req.user.isPremium
        });
    }

    catch (err) {
        console.log(err);
    }

    // const EXPENSES_PER_PAGE = Number(req.query.pageSize);
    // console.log(EXPENSES_PER_PAGE);
    // const page = Number(req.query.page);
    // let totalExpenses;

    // Expense.count({ where: { userId: req.user.id } })
    //     .then((total) => {
    //         totalExpenses = total
    //         //console.log(totalExpenses, 'total expense')
    //         return Expense.findAll({
    //             where: { userId: req.user.id },
    //             offset: (page - 1) * (EXPENSES_PER_PAGE),
    //             limit: EXPENSES_PER_PAGE
    //         })
    //     })
    //     .then((expenses) => {
    //         //console.log(expenses);
    //         res.json({
    //             expenses: expenses,
    //             currentPage: page,
    //             hasNextPage: totalExpenses - (page * EXPENSES_PER_PAGE) > 0,
    //             nextPage: Number(page) + 1,
    //             hasPreviousPage: page > 1,
    //             previousPage: Number(page) - 1,
    //             lastPage: Math.ceil(totalExpenses / EXPENSES_PER_PAGE),
    //          
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json('sonething went wrong')
    //     })

}

exports.deleteExpense = async (req, res, next) => {
    const id = req.params.id;
    // const t = await sequelize.transaction();
    try {
        const expense = await Expense.findByIdAndDelete(id);
        // console.log(expense, 'hehehe');
        const updateExpense = Number(req.user.totalExpense) - Number(expense.amount);
        await User.findByIdAndUpdate(req.user, { $set: { totalExpense: updateExpense } });
        return res.status(201).json({ message: 'success deletion' });
    }
    catch (err) {
        console.log(err);
    }



    // Expense.findByPk(id)
    //     .then((expense) => {
    //         console.log(expense.amount);
    //         const total_Expense = Number(req.user.totalExpense) - Number(expense.amount);
    //         User.update({
    //             totalExpense: total_Expense
    //         },
    //             {
    //                 where: { id: req.user.id },
    //                 transaction: t

    //             })
    //             .then(async () => {
    //                 await t.commit()
    //                 return expense.destroy();
    //             })
    //             .catch(async (err) => {
    //                 await t.rollback();
    //                 res.status(500).json(err);
    //             })

    //     })
    //     .then(() => {
    //         res.status(204).end();
    //     })
    //     .catch(err => console.log(err));
}



