const express = require('express');
const accountController = require('../controller/account');
const router = express.Router();

router.post('/randomPassword', accountController.randomPassword)

router.post('/resetPassword', accountController.checkUser);
router.post('/resetPassword', accountController.resetPassword);

module.exports = router;