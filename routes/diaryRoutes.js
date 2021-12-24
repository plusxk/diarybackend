const express = require('express');
const diaryController = require('../controller/diary');
const authController = require('../controller/auth');

const router = express.Router();

//GET specific diary by title
router.get('/user/:email/:folderName/:title', authController.verify);
router.get('/user/:email/:folderName/:title', diaryController.getDiaryByTitle);

/*關鍵字查詢*/

//GET specific diaries by title     localhost/search/1?condition=title&search_query=mydiary
//GET specific diaries by content   localhost/search/1?condition=content&search_query=sgegrhrh
//GET specific diaries by tags      localhost/search/1?condition=tags&search_query=tag
router.get('/search/:email', authController.verify);
router.get('/search/:email', diaryController.getDiaryBySearch);

//GET diaries by date               localhost/00857028@email.ntou.edu.tw/date/1?date=20211207
router.get('/date/:email', authController.verify);
router.get('/date/:email', diaryController.getDiaryByDate);

//POST diary in specific folder by folderName
router.post('/user/:email/:folderName', authController.verify);
router.post('/user/:email/:folderName', diaryController.isDuplicate, diaryController.postDiary);

//PUT specific diary by title in specific folder by folderName
router.put('/user/:email/:folderName/:title', authController.verify);
router.put('/user/:email/:folderName/:title', diaryController.isDuplicate, diaryController.putDiaryByTitle);

//DELETE specific diary by title in specific folder by folderName
router.delete('/user/:email/:folderName/:title', authController.verify);
router.delete('/user/:email/:folderName/:title', diaryController.deleteDiaryByTitle)

module.exports = router;