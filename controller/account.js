const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.checkUser = async (req, res, next) => {  // middleware: check user
    let email = req.body.email;
    let oldPassword = req.body.password;

    User.findOne({email: email}, function(err, user) {
        if(err){
            res.status(500).json({  // 500: Internal Server Error
                msg: "Something wrong when finding user!"
            });
        }
        else if(user){
            if(bcrypt.compareSync(oldPassword, user.password)){ // password pass
                next();  // next middleware: resetPassword
            }
            else{
                res.status(401).json({ // 401: Unauthorized
                    msg: "Please enter the correct password!"
                });
            }
        }
        else{
            res.status(404).json({   // 404: Not Found
                msg: "User is not found!"
            });
        }
    });
}

exports.resetPassword = async (req, res) =>  {  // middleware: reset password
    let email = req.body.email;
    let newPassword = req.body.newPassword;

    const filter = { email: email};
    const update = { password: bcrypt.hashSync(newPassword, 10)};
    User.updateOne(filter, update, (err, user) => {
        if(err){
            res.status(500).json({  // 500: Internal Server Error
                msg: "Something wrong when updating data!",
                token: req.token
            })
        }
        else{
            res.status(201).json({  // 201: Created
                msg: "Reset Password successfully",
                token: req.token
            })
        }
    });

}

exports.randomPassword = async (req, res, next) => {  // middleware randomize password

    let randPassword = Math.random().toString(36).substr(3);
    const filter = { email: req.body.email};
    const update = { password: bcrypt.hashSync(randPassword, 10)};
    User.findOneAndUpdate(filter, update, (err, user) => {
        if(err){
            res.status(500).json({  // 500: Internal Server Error
                msg: "Something wrong when updating data!"
            })
        }
        else if(user){
            // set local response 
            res.locals.email = user.email;
            res.locals.message = "New password was sending to the mail."
            res.locals.text = randPassword;
            res.locals.subject = 'Sending Verify Code!';
            next();  // next middleware: mail
        }
        else{
            res.status(404).json({  // 404: Not Found
                msg: "User is not found!"
            })
        }
    });
}
