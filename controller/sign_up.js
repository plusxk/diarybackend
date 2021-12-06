const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');

exports.sign_up=async(req, res) => { 
    // validate
    
    const user = new User(userParam);

    // hash password
    if (req.param.password) {
        user.hash = bcrypt.hashSync(req.param.password, 10);
    }

    // save user
    await user.save();
    res.status(201).json({ user });
}