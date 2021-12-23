const express = require('express');
const multer = require('multer');
const fileUploadController = require('../controller/fileUpload');
const router = express.Router();
const upload=multer();
router.post('/fileUpload',upload.single('myfile'),fileUploadController.fileUpload);

module.exports = router;