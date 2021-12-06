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

    const diary = await User
    .find({ folder : { folderName : 'uncategorized' }})
    .save();
    res.status(201).json({ diary });
};