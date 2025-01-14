const express = require('express');
const app = express();
const fs = require('fs');
const data = require('./MOCK_DATA.json');
const PORT = process.env.PORT || 8000;


//! Middleware
app.use(express.urlencoded({ extended: false })); //? first middleware function will be called

app.use( (req, res, next) => {)









app.get('/', (req, res) => {
  console.log('Running....');

  return res.send('Welcome !! this is my home page .....');
});

app.get('/about', (req, res) => {
  return res.send('Helo!! About page....');
});

app.get('/api/users', (req, res) => {
  return res.json(data);
});

app.get('/users', (req, res) => {
  const element = `
    <ul>
        ${data.map(ele => `<li> ${ele.email} </li>`).join('')};
    </ul>
    `;
  res.send(element);
});

//! post REQUEST
app.post('/api/users', (req, res) => {
  const body = req.body;
  data.push({ ...body, id: data.length + 1 });
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, msg) => {
    if (err) {
      console.log(err);
    }
  });
  return res.json({
    message: 'Sucessfully created user',
  });
});

//! MAKING PATCH REQUEST
app.patch('/api/users/:id', (req, res) => {});

// app.delete('/api/users/:id', (req, res) => {
//   const given_id = parseInt(req.params.id, 10);

//   // Check if the user exists
//   const userExists = data.some(ele => ele.id === given_id);

//   if (!userExists) {
//     return res.status(404).json({
//       message: 'User not found',
//     });
//   }

//   // Filter out the user with the given ID
//   const updatedData = data.filter(ele => ele.id !== given_id);

//   // Write the updated data to the file
//   fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedData, null, 2), err => {
//     if (err) {
//       console.error('Error writing file:', err);
//       return res.status(500).json({
//         message: 'Failed to delete user',
//       });
//     }

//     // Respond after successfully updating the file
//     return res.json({
//       message: 'Successfully deleted user',
//     });
//   });

//   // Update the in-memory `data` after successfully writing to the file
//   data = updatedData;
// });

app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  //? step 1 Read the file
  fs.readFile('./MOCK_DATA.json', 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file' });
    }

    let users;
    try {
      users = JSON.parse(data); //? step 2 Parse JSON data
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return res.status(500).json({ message: 'Error parsing JSON' });
    }

    //? step 3 Filter the user
    const updatedFile = users.filter(ele => ele.id !== id);

    // Check if the user was found
    if (users.length === updatedFile.length) {
      return res.status(404).send('User Not Found');
    }

    //? step 4 Write updated data to the file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedFile, null, 2), err => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error updating file' });
      }

      res.json({
        message: 'USER DELETED SUCCESSFULLY',
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING AT ${PORT}`);
});
