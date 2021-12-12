const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).json({ user })
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID });
        res.status(201).json({ user })
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.postUser = async (req, res) => {
    const userA = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        code: req.body.code,
        isAdmin: req.body.isAdmin,
        isActivated: req.body.isActivated
    });

    try {
        const user = await userA.save();
        res.status(201).json({ user });
    } catch(err) {
        err.statusCode = 500;
    }
  
};