const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');

exports.sign_up=async(req, res) => { 
    //verify
    try{
        User.find({code: req.body.userID},function (err, docs) { 
            if (err){ 
                console.log(err); 
            } 
            else{ 
                //console.log("Result:", docs[0].toObject().code); 
                if(docs[0].toObject().code==req.body.code){
                    res.status(500).send('Verify Code is correct.');
                    const user = new User(req);
                    user.findOneAndUpdate(
                        {email:req.body.email},
                        {$push:{password:bcrypt.hashSync(req.param.password, 10)}},
                        (err,log) =>{
                            if(err)
                                console.log("Error Message" + err);
                        }
                    );
                    await user.save();
                    res.status(201).json({ user });
                }
                else{
                    res.status(500).send('Verify Code is incorrect.');
                }
            }
        });
    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 
}