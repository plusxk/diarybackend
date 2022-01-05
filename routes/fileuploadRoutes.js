const express = require('express');
const multer = require('multer');
const fileUploadController = require('../controller/fileupload');
const authController = require('../controller/auth');
const router = express.Router();
const upload=multer();

router.post('/fileUpload', authController.verify);
router.post('/fileUpload',upload.single('myfile'),fileUploadController.fileUpload);

module.exports = router;