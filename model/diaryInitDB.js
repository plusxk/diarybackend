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

module.exports = Diary = mongoose.model('diary', DiarySchema);