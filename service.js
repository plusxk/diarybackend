const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/userRoutes');
const DiaryRoutes = require('./routes/diaryRoutes');
const FolderRoutes = require('./routes/folderRoutes');
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

app.use(UserRoutes);
app.use(DiaryRoutes);
app.use(FolderRoutes);

app.listen(PORT, () => console.log('Server Running...'))