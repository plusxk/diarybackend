// const Diary = require('../model/diaryInitDB');
// const Folder = require('../model/folderInitDB');

// exports.getFolder = async (req, res) => {
//     try {
//         const folders = await Folder.find();
//         res.status(500).json({ folders });
//     } catch(err) {
//         res.status(404).json({ msg: 'No folder found' });
//     }
// };

// exports.postFolder = async (req, res) => {
//     const diaryA = new Diary({
//         diaryID: '1',
//         title: 'mydiary',
//         content: 'THISHOGA;IHGUEWIOGSDGDSHGDSJKJDSLJKAH',
//         date: Date.now(),
//         tag: ['tag'],
//         filesURL: ['files'],
//         picURL: ['pic'],
//         videoURL: ['videos'],
//         isFavored: false
//     });
//     const folderA = new Folder({
//         folderID: '1',
//         folderName: 'myfolder',
//         diary: [diaryA]
//     });

//     const folder = await folderA.save();
//     res.status(201).json({ folder });
// };