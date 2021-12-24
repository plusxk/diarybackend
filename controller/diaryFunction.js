const User = require('../model/userDBSchema');
const crypto = require('crypto');
const config = require('../config.js');

exports.encryptedPath = (req, res) => {
    try{
        let email = req.params.email;
        let folderName = req.params.folderName;
        let title = req.params.title;
        let path = email + "/" + folderName + "/" + title;
        let secretKey = config.secretKey;
        let cipher = crypto.createCipher('aes128', secretKey);
        let enc = cipher.update(path,"utf8","hex"); //编码方式从utf-8转为hex;
        enc += cipher.final('hex');//编码方式转为hex;

        res.status(200).json({
            encryptedPath: enc
        });
    }
    catch(err){
        res.status(500).json({	// 500: Internal Server Error
			msg:"err"
		});
    }

    /*let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey, 'hex'), iv);
    let encrypted = cipher.update(path);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    let result = iv.toString('hex') + ':' + encrypted.toString('hex');
    console.log(result);
    res.status(200).json({"encryptedPath": result});*/
}; 

exports.decrypt = (req, res) => {

    try{
        let encryptedPath = req.params.encryptedPath;
        let secretKey = config.secretKey;
        let decipher = crypto.createDecipher('aes128', secretKey);
        let dec = decipher.update(encryptedPath, "hex", "utf8");
        dec += decipher.final("utf8");

        /*let textParts = encryptedPath.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(secretKey, 'hex'), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        decrypted = decrypted.toString();

        console.log(decrypted);*/

        let tokens = dec.split('/');
        let email = tokens[0];
        let folderName = tokens[1];
        let title = tokens[2];

        User.find({ email: email }, (err, docs) => {
            if (err){
                res.status(500).json({	// 500: Internal Server Error
                    msg:"err"
                });
            }
                
            else if(docs){
                const folders = docs[0].toObject().folder;
                const folder = folders.find((item, index, array) => {
                    return item.folderName === folderName;
                });
                const diaries = folder.diary;
                const diary = diaries.find((item, index, array) => {
                    return item.title === title;
                });
                res.status(200).json({diary});
            }
            else {
                res.status(404).json({	// 404: Not Found
                    msg:"not found"
                });
            }
        });
    }
    catch(err){
        res.status(500).json({	// 500: Internal Server Error
			msg:"err"
		});
    }

    //res.status(200).json({"decryptedPath": dec});
};
