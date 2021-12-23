const express = require('express');
const diaryFuncController = require('../controller/diaryFunction');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/shareLink/:email/:folderName/:title', authController.verify);
router.get('/shareLink/:email/:folderName/:title', diaryFuncController.encryptedPath)

router.get('/shareLink/:encryptedPath', authController.verify);
router.get('/shareLink/:encryptedPath', diaryFuncController.decrypt);


module.exports = router;