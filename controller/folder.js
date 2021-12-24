const User = require('../model/userDBSchema');

//取得所有資料夾
exports.getAllFolder = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err});
        else
            res.status(200).json(docs[0].toObject().folder);
    });
};

//取得資料夾(依據folderName)
exports.getFolderByName = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err});
        else {
            const folders = docs[0].toObject().folder;
            const folder = folders.find((item, index, array) => {
                return item.folderName === req.params.folderName;
            });
            res.status(200).json({ folder });
        }
    });

};

//檢查資料夾重複命名
exports.isDuplicate = (req, res, next) => {
    const folderA = {
        folderName: req.body.folderName,      //req.body.folderName
        diary: []
    };

    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            return res.status(500).json({msg: err});
        else {
            const folders = docs[0].toObject().folder;
            const folder = folders.find((item, index, array) => {
                return item.folderName === req.body.folderName;
            });
            
            if (folder !== undefined) 
                return res.status(409).json({ msg: "Found duplicate folder name." });  
            
            next();
        }
    });
}

//新增資料夾
exports.postFolder = (req, res) => {
    const folderA = {
        folderName: req.body.folderName,      //req.body.folderName
        diary: []
    };
    User.findOneAndUpdate(
        { email: req.params.email },
        { $push: { folder: folderA }},
        (err, log) => {
            if (err)
                res.status(500).json({msg: err});
            else
                res.status(200).json({ log });
        }
    );
};

//修改資料夾名稱
exports.putFolder = (req, res) => {
    User.updateOne(
        { 'email': req.params.email, 'folder.folderName': req.params.folderName },
        { $set: { 
            'folder.$.folderName': req.body.folderName       //req.body.folderName
        }},
        (err, log) => {
            if (err)
                res.status(500).json({msg: err});
            else
                res.status(200).json({ log })
        }
    );
};

//刪除資料夾
exports.deleteFolder = (req, res) => {
    User.updateOne(
        { email: req.params.email },
        { $pull: { 
            folder: {
                folderName: req.params.folderName 
            }
        }},
        (err, log) => {
            if (err)
                res.status(500).json({msg: err});
            else
                res.status(200).json({ log })
        }
    );
};