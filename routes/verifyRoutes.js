const express = require('express');
const verifyController = require('../controller/verify');

const router = express.Router();

router.post('/verify', verifyController.verify);

module.exports = router;