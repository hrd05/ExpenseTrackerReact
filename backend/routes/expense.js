const express = require('express');

const router = express.Router();

const expenseController = require('../controllers/expense');
const userAunthentication = require('../middleware/auth');

router.get('/expense', expenseController.getExpenseForm);

router.delete('/expense/:id', userAunthentication.authenticate, expenseController.deleteExpense);

router.post('/expense', userAunthentication.authenticate, expenseController.postExpense);

router.get('/expenses', userAunthentication.authenticate, expenseController.getExpenses);


module.exports = router;