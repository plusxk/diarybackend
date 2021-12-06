const User = require('../model/userInitDB');
const bodyParser = require('body-parser');
const querystring = require('querystring');
// const Diary = require('../model/diaryInitDB');
// const Folder = require('../model/folderInitDB');

exports.getUser = async (req, res) => {
   User.find({folderName: 'myfolder'},function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        console.log("Result:", docs[0].toObject().folder); 
    } 
    
    res.status(500).json(docs[0].toObject().folder);
    //res.end(JSON.stringify(temp));
});
};

exports.postUser = async (req, res) => {
    const diaryA = {
        diaryID: '1',
        title: 'mydiary',
        content: 'THISHOGA;IHGUEWIOGSDGDSHGDSJKJDSLJKAH',
        date: Date.now(),
        tag: ['tag'],
        filesURL: ['files'],
        picURL: ['pic'],
        videoURL: ['videos'],
        isFavored: false
    };
    const folderA = {
        folderID: '1',
        folderName: 'myfolder',
        diary: [diaryA]
    };
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

    const user = await userA.save();
    res.status(201).json({ user });
};