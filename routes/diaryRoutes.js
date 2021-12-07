const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

//GET specific diary by diaryID
router.get('/folder/:folderID/:diaryID', diaryController.getDiaryByID);

/*關鍵字查詢*/

//TODO: GET specific diary by title     localhost/search?condition=title&search_query=mydiary
//TODO: GET specific diary by content   localhost/search?condition=content&search_query=sgegrhrh
//TODO: GET specific diary by tags      localhost/search?condition=tags&search_query=tag
router.get('/search', diaryController.getDiaryBySearch)

//POST diary by in specific folder by folderID
router.post('/folder/:folderID', diaryController.postDiary);

module.exports = router;