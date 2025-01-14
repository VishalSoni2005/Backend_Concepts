const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(express.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(express.json()); // parse application/json

// schemas and models
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
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
const userModel = mongoose.model('User', userSchema);

// Database connection
mongoose
  .connect('mongodb://localhost:27017/helloworld')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));

//routes
app.get('/', (req, res) => {
  return res.send('Welcome to my server');
});

app.get('/about', (req, res) => {
  return res.send('Welcome to my about page');
});

app.post('/api/users', async (req, res) => {
  const body = req.body;

  if (!body.id || !body.email || !body.password) {
    return res.status(400).send('All fields are required');
  }

  const result = await userModel.create({
    id: body.id,
    email: body.email,
    password: body.password,
  });
  // no need of appending to the database

  return res.status(200).json({
    message: 'User created successfully',
    data: result,
  });
});

app.get('/display', async (req, res) => {
  const allUsers = await userModel.find();

  //   const display = `
  //         <ol>
  //             ${allUsers
  //               .map(ele => {
  //                 `<li>${ele.id}</li>`;
  //                 `<li>${ele.email}</li>`;
  //                 `<li>${ele.password}</li>`;
  //               })
  //               .join('')}

  //         </ol>
  //     `;

  const display = `
     <ol>
         ${allUsers
           .map(
             ele => `
             <li>ID: ${ele.id}</li>
             <li>Email: ${ele.email}</li>
             <li>Password: ${ele.password}</li>`
           )
           .join('')}
     </ol>
 `;

  return res.send(display);
});

// server
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
