const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

exports.mail=async(req, res) => { 
    try{
        mailText = res.locals.text;
        mailSubject = res.locals.subject;
        message = res.locals.message;

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'diaryproject1234@gmail.com',
                pass: 'mydiary1234'
            }
        });

        let email;
        if(typeof req.body.email !== 'undefined' ){
            email=req.body.email;
        }
        else{
            email=res.locals.email;
        }

        let mailOptions = {
            from: 'diaryproject1234@gmail.com',
            to:email,
            subject: mailSubject,
            text: mailText
        };

        transporter.sendMail(mailOptions,function(err) {
            if (err) {    
                res.status(500).json({ // 500: Internal Server Error
                    msg: "err"
                });
            }
            else{   // 250: Requested action taken and completed.
                res.status(250).json({
                    msg: "The mail has been sent"
                });
            }
        });
        
    }
    catch (error){  // 500: Internal Server Error
        res.status(500).json({ 
            msg: "err"
        });
    }
}