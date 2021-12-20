const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.verifyCode = async(req, res, next) => {
    let code0=Math.floor(Math.random() * 10);
    let code1=Math.floor(Math.random() * 10);
    let code2=Math.floor(Math.random() * 10);
    let code3=Math.floor(Math.random() * 10);
    let code=code0.toString()+code1.toString()+code2.toString()+code3.toString();
    res.locals.text = code;
    res.locals.subject = 'Sending Verify Code!';
    res.locals.message = 'Verify Code was sending to the mail.';

    User.findOneAndUpdate(
        {email:req.body.email},
        {$set:{code:code}},
        (err,log) => {
            if(err){    // 500: Internal Server Error
                res.status(500).json({msg:"err"});
            }
        }
    );
    next();
}

exports.signUp=async(req, res, next) => { 
    try{
        if (await User.findOne({ email: req.body.email })) {
            throw 'Username "' + req.body.email + '" is already taken';
        }
        else{
            const userA = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                code: '0',
                isAdmin: false,
                isActivated: false,
            }); 
            const user = await userA.save();
            next();
        }

    }
    catch (error){
        res.status(500).json({msg:"err"});
    } 

}

exports.verify=async(req, res) => { 

    try{
        User.find({email: req.body.email},function (err, docs) { 
            if (err){   // 500: Internal Server Error
                res.status(500).send('Error Message: ' + err ); 
            } 
            else{ 
                /*console.log('code:' ,docs[0].code);
                console.log(req.body.code);*/
                if(req.body.code==docs[0].code){
                    User.findOneAndUpdate(
                        {email:req.body.email},
                        {$set:{isActivated:true}},
                        (err,log) => {
                            if(err){    // 500: Internal Server Error
                                res.status(500).send('Error Message: ' + err ); 
                            }
                            else{   // 200: OK
                                res.status(200).json('Activate successfully!'); 
                            }
                        }
                    );
                }
                else{   // 401: Unauthorized
                    res.status(401).json('Code incorrect'); 
                }
            
    		} 
		});
    }
    catch (error){  // 500: Internal Server Error
        console.log(error);
        res.status(500).json({msg:"err"});
    } 
}