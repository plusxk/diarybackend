const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/user/:email/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/user/:email/:folderID', folderController.getFolderByID);

//POST folder
router.post('/user/:email/folder', folderController.postFolder);

//PUT specific folder by folderID
router.put('/user/:email/:folderID', folderController.putFolder);

//DELETE specific folder by folderID
router.delete('/user/:email/:folderID', folderController.deleteFolder);

module.exports = router;