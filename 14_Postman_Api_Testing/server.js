const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3000;

// routes
app.get('/', (req, res) => {
  app.send('Hello from the server, this is my home page');
});
app.get('/api/users', (req, res) => {
  res.json(users);
});

//! rendering html file
app.get('/users', (req, res) => {
  const ele = `
    <ul>
        ${users.map(name => `<li>${name.first_name}</li>`).join('')}
    </ul>
    `;
  res.send(ele);
});

// //TODO: Dynamic path params :ID is this
app.get('/api/users/:id', (req, res) => {
  const id = Number(req.params.id); // step 1 to get the id
  const user = users.find(user => user.id === id); // step 2 to get the user
  return res.json(user);
});

// ! Creating new user
//TODO: middleware to parse the body so that we can access it
app.use(express.urlencoded({ extended: false }));
app.post('/api/users', (req, res) => {
  //? first we need to get user created in postman
  const body = req.body;
  // console.log('body ', body);  // we will get json of data that we send in postman

  // users.push(body); // users database
  users.push({ ...body, id: users.length + 1 }); // users database
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    if (err) {
      console.log(err);
    }
  });
  return res.json({
    message: 'Sucessfully created user',
  });
});

//! Edidting user
app.patch('/api/users/:id', (req, res) => {
  // editing user with id of user
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
