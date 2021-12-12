const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.verifyCode = async(req, res, next) => {
    let code0=Math.floor(Math.random() * 10);
    let code1=Math.floor(Math.random() * 10);
    let code2=Math.floor(Math.random() * 10);
    let code3=Math.floor(Math.random() * 10);
    let code=code0.toString()+code1.toString()+code2.toString()+code3.toString();
    res.locals.text = code;
    res.locals.subject = 'Sending Verify Code!';
    res.locals.message = 'Verify Code was sending to the mail.';

    User.findOneAndUpdate(
        {email:req.body.email},
        {$set:{code:code}},
        (err,log) => {
            if(err)
                console.log('Error Message: ' + err );
        }
    );
    next();
}

exports.signUp=async(req, res, next) => { 
    try{
        if (await User.findOne({ email: req.body.email })) {
            throw 'Username "' + req.body.email + '" is already taken';
        }
        else{
            const userA = new User({
                userID: '30',
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                code: '0',
                isAdmin: false,
                isActivated: false,
            }); 
            const user = await userA.save();
            next();
            //res.status(201).json('成功註冊');

        }

    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 

}

exports.updateCode = async(req, res, next) => {





}