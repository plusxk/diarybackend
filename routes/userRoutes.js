const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

//GET all users
router.get('/user', userController.getUser);

//POST an user
router.post('/user', userController.postUser);

module.exports = router;