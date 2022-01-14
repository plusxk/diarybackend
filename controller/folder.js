const User = require('../model/userDBSchema');

//取得所有資料夾
exports.getAllFolder = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err, token: req.token});
        else
            res.status(200).json({folder: docs[0].toObject().folder, token: req.token});
    });
};

//取得資料夾(依據folderName)
exports.getFolderByName = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err, token: req.token});
        else {
            const folders = docs[0].toObject().folder;
            const folder = folders.find((item, index, array) => {
                return item.folderName === req.params.folderName;
            });
            res.status(200).json({ folder: folder, token: req.token });
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
            return res.status(500).json({msg: err, token: req.token});
        else {
            const folders = docs[0].toObject().folder;
            const folder = folders.find((item, index, array) => {
                return item.folderName === req.body.folderName;
            });
            
            if (folder !== undefined) 
                return res.status(409).json({ msg: "Found duplicate folder name.", token: req.token });  
            
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
                res.status(500).json({msg: err, token: req.token});
            else
                res.status(201).json({ token: req.token });
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
                res.status(500).json({ msg: err, token: req.token});
            else
                res.status(201).json({ token: req.token});
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
                res.status(500).json({msg: err, token: req.token});
            else
                res.status(201).json({ token: req.token });
        }
    );
};

//加入or取消日記至Favorite區
exports.setIsFavored = (req, res) => {
    const diaryTitle = req.body.diaryTitle;

    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err, token: req.token});
        else {
            const folders = docs[0].toObject().folder;
            const folder = folders.find((item, index, array) => {
                return item.folderName === req.params.folderName;
            });

            const diaryArray = folder.diary;
            const index = diaryArray.findIndex(obj => obj.title === diaryTitle); 
            diaryArray[index].isFavored = !diaryArray[index].isFavored;

            User.updateOne(
                { 'email': req.params.email, 'folder.folderName': req.params.folderName },
                { $set: { 
                    'folder.$.diary': diaryArray 
                }},
                (err, log) => {
                    if (err)
                        res.status(204).json({msg: err, token: req.token});
                    else
                        res.status(201).json({ token: req.token });
                }
            );
        }
    });
}

//顯示加入愛心的日記
exports.getFavoredDiaries = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            res.status(500).json({msg: err, token: req.token});
        else {
            let diaryArray = new Array();
            const folders = docs[0].toObject().folder;

            folders.forEach(folder => {
                let foundDiary = new Array();
                foundDiary = folder.diary.filter((item, index, array) => {
                    return item.isFavored === true;
                });

                if (foundDiary.length > 0) 
                    foundDiary.forEach(element => diaryArray.push(element));
            });
            res.status(200).json({ diaryArray: diaryArray, token: req.token });
        }
    });
}