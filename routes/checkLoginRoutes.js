const express = require('express');
const checkLoginController = require('../controller/checkLogin');
const router = express.Router();

router.post('/checkLogin', checkLoginController.verify)

module.exports = router;