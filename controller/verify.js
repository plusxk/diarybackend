const User = require('../model/userDBSchema');
const querystring = require('querystring');
exports.verify=async(req, res) => { 
    //verify
    //  try {
    //     User.find({folderName: 'myfolder'},function(err,docs){
    //         if(err)
    //             console.log(err);
    //         else
    //             console.log("result:",docs[0].toObject().folder);
    //         res.status(200).json(docs[0].toObject().folder);

    //     });
    // } catch(err) {
    //     res.status(404).json({ msg: 'No user found' });
    // }
    try{
        User.find({email: req.body.email},function (err, docs) { 
            if (err){ 
                console.log("Error msg:", err); 
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
                                console.log('Error Message: ' + err );
                                res.status(500).send('Error Message: ' + err ); 
                            }
                            else{
                                res.status(201).json('Activate successfully!'); 
                            }
                        }
                    );
                }
                else{
                    console.log("Error 123"); 
                    res.status(500).json('Code incorrect'); 
                }
            
            } 
        });
    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 
}