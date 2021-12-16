const express = require('express');
const diaryFuncController = require('../controller/diaryFunction')
const userController = require('../controller/user');

const router = express.Router();

//GET all users
router.get('/shareLink/:email/:folderName/:title', diaryFuncController.encryptedPath)
router.get('/shareLink/:encryptedPath', diaryFuncController.decrypt);


module.exports = router;