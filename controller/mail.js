const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
exports.mail=async(req, res) => { 
  try{
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '00857030@email.ntou.edu.tw',
        pass: 'a147896325'
      }
    });
    let email=req.query.email;
    console.log('email:' + email);
    let code0=Math.floor(Math.random() * 10);
    let code1=Math.floor(Math.random() * 10);
    let code2=Math.floor(Math.random() * 10);
    let code3=Math.floor(Math.random() * 10);
    let code=code0.toString()+code1.toString()+code2.toString()+code3.toString();
    console.log('code:'+code);
    let mailOptions = {
      from: '00857030@email.ntou.edu.tw',
      to:email,
      subject: 'Sending Verify Code!',
      text:code
    };
    transporter.sendMail(mailOptions,function(err) {
      if (err) {
        console.log('Unable to send email: ' + err);
      }
    });
    User.findOneAndUpdate(
      {email:email},
      {$set:{code:code}},
      (err,log) => {
        if(err)
          console.log('Error Message: ' + err );
      }
    );
    res.status(201).send('Verify Code was sending to the mail.');
  }
  catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
  }
}
