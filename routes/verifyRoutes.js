const express = require('express');
const verifyController = require('../controller/checkLogin');
const router = express.Router();

router.post('/verify', verifyController.verify)

module.exports = router;