const express = require('express');
const Folder = require('../model/folderInitDB');

const router = express.Router();

router.get('/folder', (req, res) => {
    Folder.find()
    .then(folders => res.status(500).json({ folders }))
    .catch(err => res.status(404).json({ msg: 'No folder found' }));
});

module.exports = router;