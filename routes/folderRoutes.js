const express = require('express');
const folderController = require('../controller/folder');

const router = express.Router();

//GET all folders
router.get('/folder', folderController.getAllFolder);

//GET specific folder by folderID
router.get('/folder/:folderID', folderController.getFolderByID);

//TODO: GET diary by in specific folder by folderID
// router.get('/folder', diaryController.postDiary);

//POST folder
router.post('/folder', folderController.postFolder);

module.exports = router;