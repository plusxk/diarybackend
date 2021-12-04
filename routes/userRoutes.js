const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.get('/user', userController.getUser);

router.post('/user', userController.postUser);

module.exports = router;