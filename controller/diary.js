const User = require('../model/userDBSchema');

//日期轉字串
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
  
    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('');
};

//取得一篇日記內容(依據diaryID)
exports.getDiaryByID = (req, res) => {
    User.find({ userID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        
        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderID === req.params.folderID;
        });
        const diaries = folder.diary;
        const diary = diaries.find((item, index, array) => {
            return item.diaryID === req.params.diaryID;
        });
        res.status(500).json({ diary });
    });
};

//取得關鍵字搜尋日記
exports.getDiaryBySearch = (req, res) => {
    User.find({ userID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        
        let diaryArray = new Array();
        const folders = docs[0].toObject().folder;
        const searchBy = req.query;
        
        folders.forEach(folder => {
            const foundDiary = folder.diary.filter((item, index, array) => {
                if (searchBy.condition === 'title')
                    return item.title.toLowerCase().includes(searchBy.search_query) === true; 
                else if (searchBy.condition === 'content')
                    return item.content.toLowerCase().includes(searchBy.search_query) === true; 
                else if (searchBy.condition === 'tags') {
                    const tags = item.tag;
                    return tags.find((it, index, array) => {
                       return it.toLowerCase().includes(searchBy.search_query) === true;
                    });
                }
            });
            
            if (foundDiary.length > 0)
                diaryArray.push(foundDiary);
        });
        res.status(500).json({ diaryArray });
    });
}

//取得日曆日期日記
exports.getDiaryByDate = (req, res) => {
    User.find({ userID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        
        let diaryArray = new Array();
        const folders = docs[0].toObject().folder;
        folders.forEach(folder => {
            const foundDiary = folder.diary.filter((item, index, array) => {
                return item.date.yyyymmdd() === req.query.date;
            });

            if (foundDiary.length > 0)
                diaryArray.push(foundDiary);
        });
        res.status(500).json({ diaryArray });
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

    User.updateOne(
        { 'userID': '1', 'folder.folderID': req.params.folderID },
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

//修改日記內容
exports.putDiaryByID = (req, res) => {
    const diaryA = {
        diaryID: '1',        //req.body.diaryID
        title: 'MYDIARY',   //req.body.title
        content: 'THISHOGA;rhrahrhsrhsrh',   //req.body.content
        date: Date.now(),   //req.body.date
        tag: ['tag', 'dsgag'],   //req.body.tag
        filesURL: ['files'],    //req.body.filesURL
        picURL: ['pic'],    //req.body.picURL
        videoURL: ['videos'],   //req.body.videoURL
        isFavored: true    //req.body.isFavored
    };

    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);

        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderID === req.params.folderID;
        });

        const diaryArray = folder.diary;
        const index = diaryArray.findIndex(obj => obj.diaryID === req.params.diaryID); 
        diaryArray[index] = diaryA;

        User.updateOne(
            { 'userID': '1', 'folder.folderID': req.params.folderID },
            { $set: { 
                'folder.$.diary': diaryArray 
            }},
            (err, log) => {
                if (err)
                    console.log('Error Message: ' + err);
                else
                    res.status(500).json({ log })
            }
        );
    });
};

//刪除日記(依據ID)
exports.deleteDiaryByID = (req, res) => {
    User.find({userID: '1'}, (err, docs) => {
        if (err)
            console.log(err);

        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderID === req.params.folderID;
        });

        const diaryArray = folder.diary;
        const index = diaryArray.findIndex(obj => obj.diaryID === req.params.diaryID); 
        diaryArray.splice(index, 1);
        
        User.updateOne(
            { 'userID': '1', 'folder.folderID': req.params.folderID },
            { $set: { 
                'folder.$.diary': diaryArray 
            }},
            (err, log) => {
                if (err)
                    console.log('Error Message: ' + err);
                else
                    res.status(500).json({ log })
            }
        );
    });
};