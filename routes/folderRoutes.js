const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/folder/:folderID', folderController.getFolderByID);

//POST folder
router.post('/folder', folderController.postFolder);

//PUT specific folder by folderID
router.put('/folder/:folderID', folderController.putFolder);

//DELETE specific folder by folderID
router.delete('/folder/:folderID', folderController.deleteFolder);

module.exports = router;