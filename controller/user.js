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

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(500).json( user )
    } catch(err) {
        res.status(404).json({ msg: 'No user found' });
    }
};

exports.postUser = async (req, res) => {
    const userA = new User({
        email: 'genewang7@gmail.com',
        password: bcrypt.hashSync('ssssss', 10),
        code: 'fhfjfj',
        isAdmin: false,
        isActivated: false
    });

    const user = await userA.save();
    res.status(201).json({ user });
};

exports.deleteUser = async (req, res) => {
    User.findOneAndDelete({email: req.params.email}, (err, result) => {
        if (err){
            res.status(500).json({msg: err});
        } 
        else{
            console.log('got deleted');
            res.status(200).json({msg: "got deleted"});
        }
    })
};
