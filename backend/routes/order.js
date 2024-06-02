const express = require('express');
const { route } = require('./expense');

const router = express.Router();

const authenticateMiddleware = require('../middleware/auth');
const orderController = require('../controllers/order');

router.get('/purchase/premiummembership', authenticateMiddleware.authenticate, orderController.getPremiumMember);

router.post('/purchase/updatetransactionstatus', authenticateMiddleware.authenticate, orderController.updateTransactionstatus);

router.get('/purchase/showleaderboard', authenticateMiddleware.authenticate, orderController.showLeaderboard);

module.exports = router;
