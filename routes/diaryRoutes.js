const express = require('express');
const diaryController = require('../controller/diary');

const router = express.Router();

// router.get('/diary', diaryController.getDiary);

//POST uncategorized diary
router.post('/uncategorized/diary', diaryController.postDiary);

module.exports = router;