const express = require('express');
const multer = require('multer');
const fileuploadController = require('../controller/fileupload');
const router = express.Router();
const upload=multer();
router.post('/fileupload',upload.single('myfile'),fileuploadController.fileupload);

module.exports = router;