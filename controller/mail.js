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
        user: '00857030@email.ntou.edu.tw',
        pass: 'a147896325'
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
      from: '00857030@email.ntou.edu.tw',
      to:email,
      subject: mailSubject,
      text: mailText
    };
    transporter.sendMail(mailOptions,function(err) {
      if (err) {
        console.log('Unable to send email: ' + err);
        res.status(500).send('Unable to send email: ' + err);
      }
      else{
        res.status(201).send(message);
      }
    });
    
  }
  catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
  }
}