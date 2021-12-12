const express = require('express');
const mailController = require('../controller/mail');

const router = express.Router();

router.post('/mail', mailController.mail);


module.exports = router;