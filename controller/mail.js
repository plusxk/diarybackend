const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
exports.mail=async(req, res) => { 
  try{
    if (await User.findOne({ useremail: req.body.email })) {
        throw 'Username "' + req.body.email + '" is already taken';
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '00857030@email.ntou.edu.tw',
        pass: 'a147896325'
      }
    });
    let email=req.body.email;
    let code0=Math.floor(Math.random() * 10);
    let code1=Math.floor(Math.random() * 10);
    let code2=Math.floor(Math.random() * 10);
    let code3=Math.floor(Math.random() * 10);
    let code=code0.toString()+code1.toString()+code2.toString()+code3.toString();
    let mailOptions = {
      from: '00857030@email.ntou.edu.tw',
      to: email,
      subject: 'Sending Verify Code!',
      text:code;
    };
    const user = new User(req);
    // hash password
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 10);
    }
    user.code=code;
    user.isActivated=false;

    // save user
    await user.save();
    res.status(500).send('Verify Code was sending to the mail.');
  }
  catch (error){
        console.log(error);
        res.status(500).json({msg:"err"});
  }
}
