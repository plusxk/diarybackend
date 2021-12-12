const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.checkUser = async (req, res, next) => {
    let id = req.body.userID;
    let oldPassword = req.body.password;

    User.findOne({userID: id}, function(err, user) {
        if(err){
            res.status(500).json({
                msg: "error"
            });
        }
        else if(user){
            if(bcrypt.compareSync(oldPassword, user.password)){
                next();
            }
            else{
                res.status(500).json({
                    msg: "Please enter the correct password"
                });
            }
        }
        else{
            res.status(404).json({
                msg: "User is not found"
            });
        }
    });
}

exports.resetPassword = async (req, res) =>  {
    let id = req.body.userID;
    let newPassword = req.body.newPassword;

    const filter = { userID: id};
    const update = { password: bcrypt.hashSync(newPassword, 10)};
    User.updateOne(filter, update, (err, user) => {
        if(err){
            res.status(500).json({
                msg: "Something wrong when updating data!"
            })
        }
        else{
            res.status(200).json({
                msg: "Reset Password successfully"
            })
        }
    });

}

exports.randomPassword = async (req, res, next) => {

    let randPassword = Math.random().toString(36).substr(3);
    const filter = { userID: req.body.userID};
    const update = { password: bcrypt.hashSync(randPassword, 10)};
    User.findOneAndUpdate(filter, update, (err, user) => {
        if(err){
            res.status(500).json({
                msg: "Something wrong when updating data!"
            })
        }
        else{
            res.locals.email = user.email;
            res.locals.message = "New password was sending to the mail."
            res.locals.text = randPassword;
            res.locals.subject = 'Sending Verify Code!';
            next();
        }
    });
}
