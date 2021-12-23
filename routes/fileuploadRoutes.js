const express = require('express');
const multer = require('multer');
const fileUploadController = require('../controller/fileUpload');
const authController = require('../controller/auth');
const router = express.Router();
const upload=multer();

router.get('/fileUpload', authController.verify);
router.post('/fileUpload',upload.single('myfile'),fileUploadController.fileUpload);

module.exports = router;