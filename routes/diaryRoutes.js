const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

//GET specific diary by diaryID
router.get('/user/:email/:folderID/:diaryID', diaryController.getDiaryByID);

/*關鍵字查詢*/

//GET specific diaries by title     localhost/search/1?condition=title&search_query=mydiary
//GET specific diaries by content   localhost/search/1?condition=content&search_query=sgegrhrh
//GET specific diaries by tags      localhost/search/1?condition=tags&search_query=tag
router.get('/search/:email', diaryController.getDiaryBySearch);

//GET diaries by date               localhos1/date/1?date=20211207
router.get('/date/:email', diaryController.getDiaryByDate);

//POST diary in specific folder by folderID
router.post('/user/:email/:folderID', diaryController.postDiary);

//PUT specific diary by diaryID in specific folder by folderID
router.put('/user/:email/:folderID/:diaryID', diaryController.putDiaryByID);

//DELETE specific diary by diaryID in specific folder by folderID
router.delete('/user/:email/:folderID/:diaryID', diaryController.deleteDiaryByID)

module.exports = router;