const User = require('../model/userDBSchema.js');
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try{
        let id = req.body.userID;
        let password = req.body.password;
        console.log(id);
        User.findOne({userID: id}, function(err, user){
            if(err){
                console.log(err);
                res.json({
                    msg: "user not found!"
                });
            }
            else{
                console.log(user);
                if(user.password == password){
                    res.status(200).json({
                        token: jwt.sign({userID:user.userID}, 'abcd', {
                            expiresIn: "60s"
                        }),
                        userID: user.userID,
                    });
                }
                else 
                    res.json({
                        msg: "password is incorrect"
                    });
                
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    }
};