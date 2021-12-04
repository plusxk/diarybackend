const express = require('express');
const Diary = require('../model/diaryInitDB');

const router = express.Router();

router.get('/diary', async (req, res) => {
    try {
        const diarys = await Diary.find();
        res.status(500).json({ diarys });
    } catch(err) {
        res.status(404).json({ msg: 'No diary found' });
    }
});

router.post('/diary/add', async (req, res) => {
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

    const diary = await diaryA.save()
    res.redirect('/diary');
});

module.exports = router;