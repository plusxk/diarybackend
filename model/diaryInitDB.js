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
        type: Boolean,
        required: true,
        default: Date.now
    },
    tag: {
        type: Array
    },
    filesURL: {
        type: Array
    },
    picURL: {
        type: Array
    },
    videoURL: {
        type: Array
    },
    isFavored: {
        type: Boolean,
        required: true
    }
});

module.exports = Diary = mongoose.model('diary', DiarySchema);