const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/user/:userID/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/user/:userID/:folderID', folderController.getFolderByID);

//POST folder
router.post('/user/:userID/folder', folderController.postFolder);

//PUT specific folder by folderID
router.put('/user/:userID/:folderID', folderController.putFolder);

//DELETE specific folder by folderID
router.delete('/user/:userID/:folderID', folderController.deleteFolder);

module.exports = router;