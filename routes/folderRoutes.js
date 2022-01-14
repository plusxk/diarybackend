const express = require('express');
const folderController = require('../controller/folder');
const authController = require('../controller/auth');
const router = express.Router();

//GET all folders
router.get('/user/:email/folder', authController.verify);
router.get('/user/:email/folder', folderController.getAllFolder);

//GET specific folder by folderName
router.get('/user/:email/:folderName', authController.verify);
router.get('/user/:email/:folderName', folderController.getFolderByName);

//POST folder
router.post('/user/:email/folder', authController.verify);
router.post('/user/:email/folder', folderController.isDuplicate, folderController.postFolder);

//PUT specific folder by folderName
router.put('/user/:email/:folderName', authController.verify);
router.put('/user/:email/:folderName', folderController.isDuplicate, folderController.putFolder);

//DELETE specific folder by folderName
router.delete('/user/:email/:folderName', authController.verify);
router.delete('/user/:email/:folderName', folderController.deleteFolder);

//GET favored diaries
router.get('/isFavored/:email', authController.verify);
router.get('/isFavored/:email', folderController.getFavoredDiaries);

//Modify diary's isFavored state
router.put('/isFavored/:email/:folderName', authController.verify);
router.put('/isFavored/:email/:folderName', folderController.setIsFavored);

module.exports = router;