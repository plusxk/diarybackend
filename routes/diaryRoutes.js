const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

//GET specific diary by diaryID
router.get('/folder/:folderID/:diaryID', diaryController.getDiaryByID);

/*關鍵字查詢*/

//GET specific diaries by title     localhost/search?condition=title&search_query=mydiary
//GET specific diaries by content   localhost/search?condition=content&search_query=sgegrhrh
//GET specific diaries by tags      localhost/search?condition=tags&search_query=tag
router.get('/search', diaryController.getDiaryBySearch)

//TODO: GET diaries by date         localhost/date?date=2021-12-07
router.get('/date', diaryController.getDiaryByDate);

//POST diary by in specific folder by folderID
router.post('/folder/:folderID', diaryController.postDiary);

module.exports = router;