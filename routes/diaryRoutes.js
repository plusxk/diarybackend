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

//GET diaries by date               localhost/date?date=20211207
router.get('/date', diaryController.getDiaryByDate);

//POST diary in specific folder by folderID
router.post('/folder/:folderID', diaryController.postDiary);

//PUT specific diary by diaryID in specific folder by folderID
router.put('/folder/:folderID/:diaryID', diaryController.putDiaryByID);

//DELETE specific diary by diaryID in specific folder by folderID
router.delete('/folder/:folderID/:diaryID', diaryController.deleteDiaryByID)

module.exports = router;