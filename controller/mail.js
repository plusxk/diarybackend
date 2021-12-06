const User = require('../model/userInitDB');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
exports.mail=async(req, res) => { 
  if (await User.findOne({ useremail: req.param.email })) {
        throw 'Username "' + req.param.email + '" is already taken';
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '00857030@email.ntou.edu.tw',
      pass: 'a147896325'
  }
  });
  let email=req.param.email;
  let code0=Math.floor(Math.random() * 10);
  let code1=Math.floor(Math.random() * 10);
  let code2=Math.floor(Math.random() * 10);
  let code3=Math.floor(Math.random() * 10);
  let mailOptions = {
    from: '00857030@email.ntou.edu.tw',
    to: email,
    subject: 'Sending Verify Code!',
    text: code0.toString()+code1.toString()+code2.toString()+code3.toString();
  };
   const user = new User(userParam);

    // hash password
    if (req.param.password) {
        user.password = bcrypt.hashSync(req.param.password, 10);
    }

    // save user
    await user.save();
  res.status(500).send('Verify Code was sending to the mail.');
}
