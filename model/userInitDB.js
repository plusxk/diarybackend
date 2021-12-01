const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    }
});

module.exports = User = mongoose.model('user', UserSchema);