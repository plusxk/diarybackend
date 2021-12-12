const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const FolderRoutes = require('./routes/folderRoutes');
const DiaryRoutes = require('./routes/diaryRoutes');
const app = express();
app.use(express.urlencoded({ extended: false }));
const PORT = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://mongo:27017/diarydb';

// mongoose
//   .connect(
//     MONGODB_URI,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

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

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });


app.listen(PORT, () => console.log('Server Running...'));

module.exports = app;