const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const UserRoutes = require('./routes/userRoutes');
const FolderRoutes = require('./routes/folderRoutes');
const DiaryRoutes = require('./routes/diaryRoutes');
const AccountRoutes = require('./routes/accountRoutes');
const AuthRoutes = require('./routes/authRoutes');
const SignUpRoutes = require('./routes/signUpRoutes');
const DiaryFunctionRoutes = require('./routes/diaryFunctionRoutes');
const FileUpLoadRoutes=require('./routes/fileUploadRoutes');

const config = require('./config');
const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'test';

(async () => {
  await mongoose
    .connect(config.db[env], config.dbParams)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
})();


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(UserRoutes);
app.use(FolderRoutes);
app.use(DiaryRoutes);
app.use(AuthRoutes);
app.use(AccountRoutes);
app.use(SignUpRoutes);
app.use(DiaryFunctionRoutes);
app.use(FileUpLoadRoutes);

app.listen(PORT, () => console.log('Server Running...'));

module.exports = app;