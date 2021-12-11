const User = require('../model/userDBSchema');

exports.checkUser = async (req, res, next) => {
    let id = req.body.userID;
    let oldPassword = req.body.password;
    let newPassword = req.body.newPassword;
    let retypePassword = req.body.retypePassword;
    if(newPassword == retypePassword){
        User.findOne({userID: id}, (err, user) => {
            if(err){
                console.log("Error message:", err);
                res.status(500).json({
                    msg: "error"
                });
            }
            else if(user){
                if(oldPassword == user.password){
                    console.log("password is correct");
                    next();
                }
                else{
                    console.log("Please enter the correct password");
                    res.status(500).json({
                        msg: "Please enter the correct password"
                    });
                }
            }
            else{
                console.log("User is not found");
                res.status(500).json({
                    msg: "User is not found"
                });
            }
        });
    }
    else{
        console.log("Please retype the correct password");
            res.status(500).json({
            msg: "Please retype the correct password"
        });
    }
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