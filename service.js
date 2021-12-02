const express = require('express');
const mongoose = require('mongoose');

const UserRoutes = require('./routes/userRoutes');
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
  
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.listen(PORT, () => console.log('Server Running...'))