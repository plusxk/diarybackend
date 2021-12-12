const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.get('/login', (req, res) => {
    res.status(200).json({msg: "success"});
});
router.post('/login', authController.login);

module.exports = router;