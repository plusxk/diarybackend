const express = require('express');
const mailController = require('../controller/mail');
<<<<<<< HEAD

const router = express.Router();

router.post('/mail', mailController.mail);
=======
const signUpController = require('../controller/signUp');

const router = express.Router();

router.post('/resendCode', signUpController.verifyCode);
router.post('/resendCode', mailController.mail);
>>>>>>> c11dd2694254eabeb1447e23e2cf8a0f51b0f39c


module.exports = router;