const User = require('../model/userDBSchema');

// exports.getFolder = async (req, res) => {
//     try {
//         const folders = await Folder.find();
//         res.status(500).json({ folders });
//     } catch(err) {
//         res.status(404).json({ msg: 'No folder found' });
//     }
// };

exports.postFolder = async (req, res) => {
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
                res.state(500).json({ log });
        }
    );
};