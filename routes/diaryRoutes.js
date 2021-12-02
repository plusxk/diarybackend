const express = require('express');
const Diary = require('../model/diaryInitDB');

const router = express.Router();

router.get('/diary', (req, res) => {
    Diary.find()
    .then(diarys => res.status(500).json({ diarys }))
    .catch(err => res.status(404).json({ msg: 'No diary found' }));
});

router.post('/diary/add', (req, res) => {
    const diaryA = new Diary({
        diaryID: '1',
        title: 'mydiary',
        content: 'THISHOGA;IHGUEWIOGSDGDSHGDSJKJDSLJKAH',
        date: Date.now(),
        tag: ['tag'],
        filesURL: ['files'],
        picURL: ['pic'],
        videoURL: ['videos'],
        isFavored: false
    });

    diaryA.save()
    .then(user => res.redirect('/diary'));
});

module.exports = router;