const express = require('express');
const app = express();
const fs = require('fs');

const connectMongooseDB = require('./connection'); 
const userRoute = require('./Routes/user.js');
const logReqRes = require('./middleWares/index.js');

app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(logReqRes('log.txt'));

// Connect to MongoDB
connectMongooseDB('mongodb://localhost:27017/helloworld');

const user = mongoose.model('User', userSchema);

app.use('./user', userRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
