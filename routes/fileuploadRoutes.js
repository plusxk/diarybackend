const express = require('express');
const fileuploadController = require('../controller/fileupload');
const router = express.Router();

router.post('/fileupload', fileuploadController.fileupload);

module.exports = router;