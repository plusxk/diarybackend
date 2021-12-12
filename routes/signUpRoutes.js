const express = require('express');
const sing_upController = require('../controller/signUp');
const mailController = require('../controller/mail');

const router = express.Router();

router.post('/signUp', sing_upController.sign_up);
router.post('/signUp', mailController.mail);

module.exports = router;