const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');
const mailController = require('../controller/mail');
exports.sign_up=async(req, res,next) => { 
    try{
        if (await User.findOne({ email: req.query.email })) {
            throw 'Username "' + req.query.email + '" is already taken';
        }
        else{
            const userA = new User({
                userID: '30',
                email: req.query.email,
                password: bcrypt.hashSync(req.query.password, 10),
                code: '0',
                isAdmin: false,
                isActivated: false,
            }); 
            const user = await userA.save();
            res.status(201).json('成功註冊');
        }

    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 
    next();
}