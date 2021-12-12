const User = require('../model/userDBSchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.login = async (req, res) => {
    try{ 
        let id = req.body.userID;
        let password = req.body.password;

        User.findOne({userID: id}, function(err, user){
            if(err){
                res.status(500).json({
                    msg: "userID " + id + " is not found!"
                });
            }
            else if(user){
                if(bcrypt.compareSync(password, user.password)){
                    res.status(200).json({
                        token: jwt.sign({userID:user.userID}, config.authenticateJWT, {
                            expiresIn: "60s"
                        }),
                        userID: user.userID,
                    });
                }
                else{
                    res.status(500).json({
                        msg: "password is incorrect"
                    });
                }
                
            }
            else{
                res.status(500).json({
                    msg: "user not found"
                });
            }
        });
    }
    catch (error){
        res.status(500).json({msg:"err"});
    }
};