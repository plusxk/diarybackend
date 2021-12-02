const express = require('express');
const Diary = require('../model/diaryInitDB');

const router = express.Router();

router.get('/diary', (req, res) => {
    Diary.find()
    .then(diarys => res.status(500).json({ diarys }))
    .catch(err => res.status(404).json({ msg: 'No diary found' }));
});

module.exports = router;