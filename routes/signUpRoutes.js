const express = require('express');
const signUpController = require('../controller/signUp');
const mailController = require('../controller/mail');

const router = express.Router();

router.post('/signUp', signUpController.signUp);
router.post('/signUp', signUpController.verifyCode);
router.post('/signUp', mailController.mail);

router.post('/resendCode', signUpController.verifyCode);
router.post('/resendCode', mailController.mail);

router.post('/verify', signUpController.verify);

module.exports = router;