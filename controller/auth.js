const User = require('../model/userDBSchema');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const config = require('../config');

exports.login = async (req, res) => { // middleware: login
    try{ 
        let email = req.body.email;
        let password = req.body.password;

        User.findOne({email: email}, function(err, user){
            if(err){ // something wrong
                res.status(500).json({ // 500: Internal Server Error
                    msg: "Something wrong when finding user!"
                });
            }
            else if(user){  // user is found
                if(bcrypt.compareSync(password, user.password)){
                    res.status(200).json({  // 200: OK
                        token: jwt.sign({email:user.email}, config.authenticateJWT, {
                            expiresIn: "60s"
                        }),
                        email: user.email,
                    });
                }
                else{
                    res.status(401).json({  // 401: Unauthorized
                        msg: "Password is incorrect!"
                    });
                }
                
            }
            else{   // user is found
                res.status(404).json({  // 404: Not Found
                    msg: "User is not found!"
                });
            }
        });
    }
    catch (error){
        res.status(500).json({msg:"err"});  // 500: Internal Server Error
    }
};

exports.verify = async (req, res, next) => {
    let token = req.headers.authorization;

    jwt.verify(token, config.authenticateJWT , function(err, decode){
        if(err){  // 401: Unauthorized
            res.status(401).json({msg: '當前用戶未登入'});
        }
        else{
            res.status(200).json({     // 200: OK
                email: decode.email,
                msg: '已登入'
            });
            token: jwt.sign({email:user.email}, config.key , {
                expiresIn: "60s"
            });
        }
    })
}