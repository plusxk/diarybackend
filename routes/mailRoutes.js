const express = require('express');
const mailController = require('../controller/mail');
const signUpController = require('../controller/signUp');

const router = express.Router();

router.post('/signUp', signUpController.verifyCode);
router.post('/mail', mailController.mail);


module.exports = router;