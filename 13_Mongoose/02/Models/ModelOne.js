const mongoose = require('mongoose');

//schema
const schema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// model
const User = mongoose.model('User', schema); // this is one of the collections

module.exports = User;