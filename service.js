const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const MailRoutes = require('./routes/mailRoutes');
const VerifyRoutes = require('./routes/verifyRoutes');
const SignUpRoutes = require('./routes/sign_upRoutes');
const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    'mongodb://mongo:27017/diarydb',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
  
app.use(UserRoutes);
app.use(MailRoutes);
app.use(SignUpRoutes);
app.use(VerifyRoutes);
  
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });


app.listen(PORT, () => console.log('Server Running...'));