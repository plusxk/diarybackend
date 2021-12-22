const express = require('express');
const sing_upController = require('../controller/sign_up');
const mailController = require('../controller/mail');

const router = express.Router();

router.post('/sign_up', sing_upController.sign_up);
router.post('/sign_up', mailController.mail);

module.exports = router;