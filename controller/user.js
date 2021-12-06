const User = require('../model/userDBSchema');
// const Diary = require('../model/diaryInitDB');
// const Folder = require('../model/folderInitDB');

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(500).json({ user })
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.postUser = async (req, res) => {
    // const diaryA = {
    //     diaryID: '1',        //req.body.diaryID
    //     title: 'mydiary',   //req.body.title
    //     content: 'THISHOGA;IHGUEWIOGSDGDSHGDSJKJDSLJKAH',   //req.body.content
    //     date: Date.now(),   //req.body.date
    //     tag: ['tag'],   //req.body.tag
    //     filesURL: ['files'],    //req.body.filesURL
    //     picURL: ['pic'],    //req.body.picURL
    //     videoURL: ['videos'],   //req.body.videoURL
    //     isFavored: false    //req.body.isFavored
    // };
    // const folderA = {
    //     folderID: '1',
    //     folderName: 'myfolder',
    //     diary: [diaryA]
    // };
    const userA = new User({
        userID: '1',
        email: 'genewang7@gmail.com',
        password: 'ssssss',
        code: false,
        isAdmin: false,
        isActivated: false,
        accessKey: 'aieghio;df'
    });

    
    const user = await userA.save();
    res.status(201).json({ user });
};