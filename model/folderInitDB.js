const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
    folderID: {
        type: String,
        required: true
    },
    folderName: {
        type: String,
        required: true
    },
    diary: {
        type: [Schema.Types.Mixed]
    }
});

module.exports = Folder = mongoose.model('folder', FolderSchema);