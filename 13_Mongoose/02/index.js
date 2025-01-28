const express = require('express');
const app = express();
const userRouter = require('./Routes/Routes');
const logFile = require('./Middlewares/Middlewares');
const { connectDB } = require('./connection');

//!middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//!connect to MongoDB database
connectDB('mongodb://127.0.0.1:27017/28th-january')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

app.use(logFile('log.txt')); //* only this middleware is imported
//!routes
app.use('/users', userRouter);

const PORT = 8080;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
