const User = require('../model/userDBSchema');
const markdown = require('markdown-it')();

//日期轉字串
Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
        ].join('');
};

//取得一篇日記內容(依據title)
exports.getDiaryByTitle = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            console.log(err);
        
        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderName === req.params.folderName;
        });
        const diaries = folder.diary;
        const diary = diaries.find((item, index, array) => {
            return item.title === req.params.title;
        });
        res.status(200).json({ diary });
    });
};

//取得關鍵字搜尋日記
exports.getDiaryBySearch = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
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
        res.status(200).json({ diaryArray });
    });
}

//取得日曆日期日記
exports.getDiaryByDate = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
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
        res.status(200).json({ diaryArray });
    });
};

//新增日記入指定資料夾
exports.postDiary = (req, res) => {
    const diaryA = {
        title: req.body.title,   //req.body.title
        content: req.body.content,   //req.body.content
        date: req.body.date,   //req.body.date
        tag: req.body.tag,   //req.body.tag
        filesURL: req.body.filesURL,    //req.body.filesURL
        picURL: req.body.picURL,    //req.body.picURL
        videoURL: req.body.videoURL,   //req.body.videoURL
        isFavored: req.body.isFavored,    //req.body.isFavored
        markdown: markdown.render(req.body.content)
    };

    User.updateOne(
        { 'email': req.params.email, 'folder.folderName': req.params.folderName },
        { $push: { 
            'folder.$.diary': diaryA 
        }},
        { upsert: true },
        (err, log) => {
            if (err)
                console.log('Error Message: ' + err);
            else
                res.status(200).json({ log });
        }
    );
};

//修改日記內容
exports.putDiaryByTitle = (req, res) => {
    const diaryA = {
        title: req.body.title,   //req.body.title
        content: req.body.content,   //req.body.content
        date: req.body.date,   //req.body.date
        tag: req.body.tag,   //req.body.tag
        filesURL: req.body.filesURL,    //req.body.filesURL
        picURL: req.body.picURL,    //req.body.picURL
        videoURL: req.body.videoURL,   //req.body.videoURL
        isFavored: req.body.isFavored,    //req.body.isFavored
        markdown: markdown.render(req.body.content)
    };

    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            console.log(err);

        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderName === req.params.folderName;
        });

        const diaryArray = folder.diary;
        const index = diaryArray.findIndex(obj => obj.title === req.params.title); 
        diaryArray[index] = diaryA;

        User.updateOne(
            { 'email': req.params.email, 'folder.folderName': req.params.folderName },
            { $set: { 
                'folder.$.diary': diaryArray 
            }},
            (err, log) => {
                if (err)
                    console.log('Error Message: ' + err);
                else
                    res.status(200).json({ log });
            }
        );
    });
};

//刪除日記(依據title)
exports.deleteDiaryByTitle = (req, res) => {
    User.find({ email: req.params.email }, (err, docs) => {
        if (err)
            console.log(err);

        const folders = docs[0].toObject().folder;
        const folder = folders.find((item, index, array) => {
            return item.folderName === req.params.folderName;
        });

        const diaryArray = folder.diary;
        const index = diaryArray.findIndex(obj => obj.title === req.params.title); 
        diaryArray.splice(index, 1);
        
        User.updateOne(
            { email: req.params.email, 'folder.folderName': req.params.folderName },
            { $set: { 
                'folder.$.diary': diaryArray 
            }},
            (err, log) => {
                if (err)
                    console.log('Error Message: ' + err);
                else
                    res.status(200).json({ log });
            }
        );
    });
};