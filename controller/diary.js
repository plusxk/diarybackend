const User = require('../model/userDBSchema');
const bodyParser = require('body-parser');



// exports.getDiary = async (req, res) => {
//     try {
//         const diarys = await Diary.find();
//         res.status(500).json({ diarys });
//     } catch(err) {
//         res.status(404).json({ msg: 'No diary found' });
//     }
// };


//新增日記入指定資料夾
exports.postDiary = async (req, res) => {
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
                res.state(500).json({ log })
        }
    );

};