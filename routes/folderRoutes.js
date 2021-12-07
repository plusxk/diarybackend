const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/user/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/user/folder/:folderID', folderController.getFolderByID);

//POST folder
router.post('/user/folder', folderController.postFolder);

module.exports = router;