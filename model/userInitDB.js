const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const DiarySchema = new Schema({
    diaryID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    tag: {
        type: [String]
    },
    filesURL: {
        type: [String]
    },
    picURL: {
        type: [String]
    },
    videoURL: {
        type: [String]
    },
    isFavored: {
        type: Boolean,
        required: true
    }
});


const FolderSchema = new Schema({
    folderID: {
        type: String,
        required: true
    },
    folderName: {
        type: String,
        required: true
    },
    diary: [Schema.Types.Mixed]
});


const UserSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    code: {
        type: Boolean
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isActivated: {
        type: Boolean,
        required: true
    },
    accessKey: {
        type: String
    },
    folder: [Schema.Types.Mixed]
});

module.exports = User = mongoose.model('user', UserSchema);