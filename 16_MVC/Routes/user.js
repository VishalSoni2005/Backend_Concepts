const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send('Welcome to my server');
});

router.get('/about', (req, res) => {
  return res.send('Welcome to my about page');
});

router.get('/display', async (req, res) => {
  const allUsers = await userModel.find();
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

router.get('/:id', (req, res) => {  // to get user of specified id
  const id = Number(req.params.id); // step 1 to get the id
  const user = users.find(user => user.id === id); // step 2 to get the user
  return res.json(user);
});

router.post('/', async (req, res) => {  // new user will be added on post request
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

module.exports = router;