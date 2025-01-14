const mongoose = require('mongoose');
const express = require('express');
const app = express();

//! step 1 - create a schema
const userSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
});

//! step 2 - Create a model using the schema
const user = mongoose.model('User', userSchema);

//! step 3 - Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/firstMongoDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
 

//todo: making post request ot add new user to database
// building server to connect to mongodb
app.get('/', (req, res) => {
    res.send("Mongodb is available");
});

app.post( '/api/users', async (req, res) => {
    if(
        !body.firstName || !body.lastName || !body.email || !body.password
    ){
        return res.status(400).send("All fields are required");
    }

    const result = await user.create( {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    })
})





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});