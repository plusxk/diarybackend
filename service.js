const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const config = require('./config');
const app = express();

const UserRoutes = require('./routes/userRoutes');
const FolderRoutes = require('./routes/folderRoutes');
const DiaryRoutes = require('./routes/diaryRoutes');
const AccountRoutes = require('./routes/accountRoutes');
const AuthRoutes = require('./routes/authRoutes');
const SignUpRoutes = require('./routes/signUpRoutes');
const DiaryFunctionRoutes = require('./routes/diaryFunctionRoutes');
const FileUpLoadRoutes=require('./routes/fileUploadRoutes');


app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3001;
const env = process.env.NODE_ENV || 'development';

(async () => {
  await mongoose
    .connect(config.db[env], config.dbParams)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
})();


app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/*
// for production
if(env === "production"){
  app.use(express.static(path.resolve(__dirname, 'client/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
}
*/

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