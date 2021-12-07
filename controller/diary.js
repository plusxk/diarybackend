const User = require('../model/userDBSchema');
const bodyParser = require('body-parser');


//取得一篇日記內容(依據diaryID)
exports.getDiaryByID = (req, res) => {
    User.find({ userID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        
        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderName === 'Uncategorized';
        });
        const diaries = folder.diary;
        const diary = diaries.find((item, index, array) => {
            return item.diaryID === req.params.diaryID;
        });
        res.status(500).json({ diary });
    });
};

//取得一篇日記內容(關鍵字搜尋)
exports.getDiaryBySearch = (req, res) => {
    User.find({ userID: '1' }, (err, docs) => {
        if (err)
            console.log(err);
        
        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderName === 'Uncategorized';
        });
        const diaries = folder.diary;
        const searchBy = req.query;
        const diary = diaries.find((item, index, array) => {
            if (searchBy.condition === 'title')
                return item.title.includes(searchBy.search_query) === true; 
            else if (searchBy.condition === 'content')
                return item.content.includes(searchBy.search_query) === true; 
            else if (searchBy.condition === 'tags') {
                const tags = item.tag;
                return tags.find((it, index, array) => {
                    return it.includes(searchBy.search_query) === true;
                });
            }
        });
        res.status(500).json({ diary });
    });
}

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
        { 'folder.folderID': req.params.folderID },
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