const User = require('../model/userDBSchema');

//取得所有資料夾
exports.getAllFolder = (req, res) => {
    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);
        res.status(500).json(docs[0].toObject().folder);
    });
};

//取得資料夾(依據folderID)
exports.getFolderByID = (req, res) => {
    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);

        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderID === req.params.folderID;
        });
        res.status(500).json({ folder });
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