const User = require('../model/userInitDB');

exports.getUser = async (req, res) => {
    try {
        User.find({folderName: 'myfolder'},function(err,docs){
            if(err)
                console.log(err);
            else
                console.log("result:",docs[0].toObject().folder);
            res.status(200).json(docs[0].toObject().folder);

        });
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
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
        userID: 'testUsername',
        email: 'genewang7@gmail.com',
        password: 'ssssss',
        code: '0000',
        isAdmin: false,
        isActivated: false,
        folder: [folderA]
    });

    const user = await userA.save();
    res.status(201).json({ user });
};