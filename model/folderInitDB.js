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
    diaryID: {
        type: Array,
        required: true
    }
});

module.exports = Folder = mongoose.model('folder', FolderSchema);