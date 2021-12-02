const express = require('express');
const User = require('../model/userInitDB');

const router = express.Router();

router.get('/user', (req, res) => {
    User.find()
    .then(users => res.status(500).json({ users }))
    .catch(err => res.status(404).json({ msg: 'No user found' }));
});

module.exports = router;