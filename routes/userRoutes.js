const express = require('express');
const userController = require('../controller/user');
const authController = require('../controller/auth');

const router = express.Router();

//GET all users
router.get('/user', authController.verify);
router.get('/user', userController.getUser);

//GET a user
router.get('/user/:email', authController.verify);
router.get('/user/:email', userController.getUserByEmail);

//POST an user
router.post('/user', authController.verify);
router.post('/user', userController.postUser);

//DELETE an user
router.delete('/user/:email', authController.verify);
router.delete('/user/:email', userController.deleteUser);

module.exports = router;