const User = require('../model/userDBSchema');
const querystring = require('querystring');
exports.verify=async(req, res) => { 
    try{
        User.find({email: req.body.email},function (err, docs) { 
            if (err){ 
                res.status(500).json({ // 500: Internal Server Error
                    msg: "err"
                });
            } 
            else{ 
                console.log('code:' ,docs[0].code);
                console.log(req.body.code);
                if(req.body.code==docs[0].code){
                    User.findOneAndUpdate(
                        {email:req.body.email},
                        {$set:{isActivated:true}},
                        (err,log) => {
                            if(err){
                                res.status(500).json({ // 500: Internal Server Error
                                    msg: "err"
                                });
                            }
                            else{
                                res.status(201).json({ // 201: Created
                                    msg: "Activate successfully!"
                                });
                            }
                        }
                    );
                }
                else{
                    res.status(401).json({ // 401: Unauthorized
                        msg: "Your code is incorrect!"
                    });
                }
            
            } 
        });
    }
    catch (error){
        res.status(500).json({ // 500: Internal Server Error
            msg: "err"
        });
    } 
}