const express = require('express');
const mailController = require('../controller/mail');
const signUpController = require('../controller/signUp');

const router = express.Router();

router.post('/resendCode', signUpController.verifyCode);
router.post('/resendCode', mailController.mail);


module.exports = router;