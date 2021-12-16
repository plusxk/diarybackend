const User = require('../model/userDBSchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.login = async (req, res) => {
    try{ 
        let email = req.body.email;
        let password = req.body.password;

        User.findOne({email: email}, function(err, user){
            if(err){
                res.status(500).json({
                    msg: "email " + email + " is not found!"
                });
            }
            else if(user){
                if(bcrypt.compareSync(password, user.password)){
                    res.status(200).json({
                        token: jwt.sign({email:user.email}, config.authenticateJWT, {
                            expiresIn: "60s"
                        }),
                        email: user.email,
                    });
                }
                else{
                    res.status(500).json({
                        msg: "password is incorrect"
                    });
                }
                
            }
            else{
                res.status(404).json({
                    msg: "user not found"
                });
            }
        });
    }
    catch (error){
        res.status(500).json({msg:"err"});
    }
};