
const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');
const userAunthentication = require('../middleware/auth');

router.get('/', userController.getSignup);

router.post('/signup', userController.postSignup);

// router.get('/login', userController.getLogin);

router.post('/login', userController.postLogin);

router.post('/complete-profile', userAunthentication.authenticate, userController.postCompleteProfile)

router.post('/verify-email', userAunthentication.authenticate, userController.verifyEmail);

router.get('/verify-email', userController.verifyTokenFromLink);

router.get('/user/download', userAunthentication.authenticate, expenseController.getDownload);

router.post('/user/download', userController.postFileUrl);

router.get('/user/downloadhistory', userAunthentication.authenticate, userController.getDownloadHistory);



module.exports = router;