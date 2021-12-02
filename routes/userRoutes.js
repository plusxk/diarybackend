const express = require('express');
const User = require('../model/userInitDB');
const Diary = require('../model/diaryInitDB');
const Folder = require('../model/folderInitDB');

const router = express.Router();

router.get('/user', (req, res) => {
    User.find()
    .then(users => res.status(500).json({ users }))
    .catch(err => res.status(404).json({ msg: 'No user found' }));
});

router.post('/user/add', (req, res) => {
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
    const folderA = new Folder({
        folderID: '1',
        folderName: 'myfolder',
        diary: [diaryA]
    });
    const userA = new User({
        userID: '1',
        email: 'genewang7@gmail.com',
        password: 'ssssss',
        code: false,
        isAdmin: false,
        isActivated: false,
        accessKey: 'aieghio;df',
        folder: [folderA]
    });

    userA.save()
    .then(user => res.redirect('/user'));
});

module.exports = router;