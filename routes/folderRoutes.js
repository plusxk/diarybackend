const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/folder', folderController.getFolder);

//POST folder
router.post('/folder', folderController.postFolder);

module.exports = router;