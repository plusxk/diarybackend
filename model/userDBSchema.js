const mongoose = require('mongoose')
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const Schema = mongoose.Schema;
const DiarySchema = new Schema({

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
    },
    sanitizedHtml: {
        type: String
    }
});


const FolderSchema = new Schema({

    folderName: {
        type: String,
        required: true
    },
    diary: [DiarySchema]
});


const UserSchema = new Schema({

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
        type: String
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isActivated: {
        type: Boolean,
        required: true
    },
    folder: {
        type: [FolderSchema],
        required: true,
        default: [
            {
                folderName: 'Uncategorized',
                diary: []
            },
            {
                folderName: 'Favorite',
                diary: []
            }
        ]
    }
});

DiarySchema.pre('validate', function(next) {
    if (this.content) 
        this.sanitizedHtml = dompurify.sanitize(marked(this.content));
    
    next();
})

module.exports = User = mongoose.model('user', UserSchema);