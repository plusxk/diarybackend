const User = require('../model/userInitDB');
const mongoose = require('mongoose');

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
            if(oldPassword == user.password){
                next();
            }
            else{
                res.status(500).json({
                    msg: "Please enter the correct password"
                });
            }
        }
        else{
            res.status(500).json({
                msg: "User is not found"
            });
        }
    });
}

exports.resetPassword = async (req, res) =>  {
    let id = req.body.userID;
    let newPassword = req.body.newPassword;

    const filter = { userID: id};
    const update = { password: newPassword};
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