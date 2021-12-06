const express = require('express');
const sing_upController = require('../controller/sign_up');

const router = express.Router();

router.post('/sign_up', sing_upController.sign_up);


module.exports = router;