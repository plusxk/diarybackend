const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/user/:email/folder', folderController.getAllFolder);

//GET specific folder by folderName
router.get('/user/:email/:folderName', folderController.getFolderByID);

//POST folder
router.post('/user/:email/folder', folderController.postFolder);

//PUT specific folder by folderName
router.put('/user/:email/:folderName', folderController.putFolder);

//DELETE specific folder by folderName
router.delete('/user/:email/:folderName', folderController.deleteFolder);

module.exports = router;