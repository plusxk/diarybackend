const User = require('../model/userDBSchema');
const bodyParser = require('body-parser');

//取得Uncategorized底下所有日記
exports.getAllDiary = (req, res) => {
    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);
        res.status(500).json(docs[0].toObject().folder[0]);
    });
};

//TODO: 取得一篇日記內容(依據diaryID)
exports.getDiaryByID = (req, res) => {
    User.find({ diaryID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        res.status(500).json(docs[0].toObject().folder[0].diary[diaryID - 1]);
    });
};


//新增日記入指定資料夾
exports.postDiary = (req, res) => {
    const diaryA = {
        diaryID: '1',        //req.body.diaryID
        title: 'mydiary',   //req.body.title
        content: 'THISHOGA;IHGUEWIOGSDGDSHGDSJKJDSLJKAH',   //req.body.content
        date: Date.now(),   //req.body.date
        tag: ['tag'],   //req.body.tag
        filesURL: ['files'],    //req.body.filesURL
        picURL: ['pic'],    //req.body.picURL
        videoURL: ['videos'],   //req.body.videoURL
        isFavored: false    //req.body.isFavored
    };

    const defaultFolderName = 'Uncategorized';
    User.updateOne(
        { 'folder.folderName': defaultFolderName },
        { $push: { 
            'folder.$.diary': diaryA 
        }},
        { upsert: true },
        (err, log) => {
            if (err)
                console.log('Error Message: ' + err);
            else
                res.status(500).json({ log })
        }
    );

};