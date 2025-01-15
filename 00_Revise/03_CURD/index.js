const express = require('express');
// const userModel = require('./models/userSchema.js');
const routes = require('./Routes/Routes.js');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// Routes
app.use('/', routes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/New_DB_One').then(() => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
