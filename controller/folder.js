const User = require('../model/userDBSchema');

//取得所有資料夾
exports.getFolder = (req, res) => {
    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);
        res.status(500).json(docs[0].toObject().folder);
    });
};

//新增資料夾
exports.postFolder = (req, res) => {
    const folderA = {
        folderID: '3',      //req.body.folderID
        folderName: 'myfolder',      //req.body.folderName
        diary: []
    };
    User.findOneAndUpdate(
        { userID: '1' },
        { $push: { folder: folderA }},
        (err, log) => {
            if (err)
                console.log('Error Message: ' + err);
            else
                res.status(500).json({ log });
        }
    );
};