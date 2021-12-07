const User = require('../model/userInitDB');
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
        User.find({email: req.query.email},function (err, docs) { 
    		if (err){ 
        		console.log(err); 
    		} 
    		else{ 
                console.log('code:' ,docs[0].code);
        		if(req.query.code==docs[0].code)
        			res.status(201).json('Code correct'); 
                else
                    res.status(500).json('Code incorrect'); 
            
    		} 
		});
    }
    catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
    } 
}