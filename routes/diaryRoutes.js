const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

//GET specific diary by diaryID
router.get('/user/folder/:folderID/:diaryID', diaryController.getDiaryByID);

//TODO: GET specific diary by title
router.get('/user/folder/:folderID/:title', diaryController.getDiaryByTitle)

//TODO: GET specific diary by content
router.get('/user/folder/:folderID/:content', diaryController.getDiaryByContent)

//TODO: GET specific diary by tags
router.get('/user/folder/:folderID/:tag', diaryController.getDiaryByTags)

//POST diary by in specific folder by folderID
router.post('/user/folder/:folderID', diaryController.postDiary);

module.exports = router;