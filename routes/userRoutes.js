const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

//GET all users
router.get('/user', userController.getUser);

//GET a user
router.get('/user/:email', userController.getUserByEmail);

//POST an user
router.post('/user', userController.postUser);

//DELETE an user
router.delete('/user/:email', userController.deleteUser);

module.exports = router;