const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

//GET all diarys in specific folder
router.get('/diary', diaryController.getAllDiary);

//GET specific diary by diaryID
router.get('/diary/:diaryID', diaryController.getDiaryByID);



//POST uncategorized diary
router.post('/diary', diaryController.postDiary);

module.exports = router;