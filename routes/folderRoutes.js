const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/folder/:folderID', folderController.getFolderByID)

//POST folderr
router.post('/folder', folderController.postFolder);

module.exports = router;