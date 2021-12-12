const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        const user = await User.find();
        res.status(500).json({ user })
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findOne({ userID: req.params.userID });
        res.status(500).json({ user })
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.postUser = async (req, res) => {
    const userA = new User({
        userID: '1',
        email: 'genewang7@gmail.com',
        password: bcrypt.hashSync('ssssss', 10),
        code: 'fhfjfj',
        isAdmin: false,
        isActivated: false
    });

    const user = await userA.save();
    res.status(201).json({ user });
};