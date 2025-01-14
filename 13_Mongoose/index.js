const mongoose = require('mongoose');
const express = require('express');
const app = express();

// middleware
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json
app.use(express.static('public'));

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
mongoose //? it returns a promise
  .connect('mongodb://127.0.0.1:27017/firstMongoDB')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

//* building server to connect to mongodb
app.get('/', (req, res) => {
  res.send('Mongodb is available');
});

//todo: making post request ot add new user to database
app.post('/api/users', async (req, res) => {
  const body = req.body; // this is html body returned from post request(postman)
  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    return res.status(400).send('All fields are required');
  }

  const result = await user.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  });

  // console.log(result);

  return res.status(200).json({
    message: 'User created successfully',
    data: result,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Connect to MongoDB
// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const user = mongoose.model('User', userSchema);

// mongoose
//   .connect('mongodb://127.0.0.1:27017/firstMongoDB')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Could not connect to MongoDB', err));

// // Routes
// app.get('/', (req, res) => {
//   res.send('Mongodb is available');
// });

// app.post('/api/users', async (req, res) => {
//   const body = req.body;
//   if (!body.firstName ||!body.lastName ||!body.email ||!body.password) {
//     return res.status(400).send('All fields are required');
//   }

//   const result = await user.create({
//     firstName: body.firstName,
//     lastName: body.lastName,
//     email: body.email,
//     password: body.password,
//   });

//   return res.status(200).json({
//     message: 'User created successfully',
//     data: result,
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
