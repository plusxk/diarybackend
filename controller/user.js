const User = require('../model/userDBSchema');
<<<<<<< HEAD
// const Diary = require('../model/diaryInitDB');
// const Folder = require('../model/folderInitDB');
=======
const bcrypt = require('bcryptjs');
>>>>>>> c11dd2694254eabeb1447e23e2cf8a0f51b0f39c

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(500).json({ user })
<<<<<<< HEAD
=======
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(500).json( user )
>>>>>>> c11dd2694254eabeb1447e23e2cf8a0f51b0f39c
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.postUser = async (req, res) => {
<<<<<<< HEAD
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
=======
>>>>>>> c11dd2694254eabeb1447e23e2cf8a0f51b0f39c
    const userA = new User({
        email: 'genewang7@gmail.com',
<<<<<<< HEAD
        password: 'ssssss',
=======
        password: bcrypt.hashSync('ssssss', 10),
>>>>>>> c11dd2694254eabeb1447e23e2cf8a0f51b0f39c
        code: 'fhfjfj',
        isAdmin: false,
        isActivated: false
    });

    
    const user = await userA.save();
    res.status(201).json({ user });
};

exports.deleteUser = async (req, res) => {
    User.findOneAndDelete({email: req.params.email}, (err, result) => {
        if (err){
            res.status(500).json({msg: err});
        } 
        else{
            console.log('got deleted');
            res.status(200).json({msg: "got deleted"});
        }
    })
};
