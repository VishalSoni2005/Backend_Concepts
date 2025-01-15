const express = require('express');
const userModel = require('../models/userSchema.js');

const router = express.Router();

//* R => Read
router.get('/', (req, res) => {
  res.send('Welcome to the User page');
});
router.get('/about', (req, res) => {
  res.send('Welcome to the User about page');
});
router.get('/display', async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).send(allUsers);
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});
//! NOTE: The find() method in Mongoose returns a promise that resolves to an array of users matching the query.
router.get('/display/:name', async (req, res) => {
  const name = req.params.name;
  try {
    const user = await userModel.findOne({ firstName: name }); // Use findOne() instead of find()
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error });
  }
});

//* C => Create
router.post('/', async (req, res) => {
  const body = req.body;

  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    return res.status(400).send('All fields are required');
  }

  const newUser = await userModel.create({
    //! we provide model here to create new data
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
  }); //todo: user is created here instead

  return res.status(200).json({
    //todo: we are passing the body here
    message: 'User created successfully',
    data: newUser,
  });
});

//* U => Update
//1-> using PUT method
router.put('/updateByFirstName/:firstName', async (req, res) => {
  const firstName = req.params.firstName;
  const body = req.body;

  if (!body.firstName || !body.lastName || !body.email || !body.password) {
    return res.status(400).send('All fields are required');
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate({ firstName: firstName }, body, { new: true });
    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Server error', error });
  }
});

//2-> using PATCH method
router.patch('/updateByFirstName/:firstName', async (req, res) => {
  const firstName = req.params.firstName;
  const { lastName, email, password } = req.body;

  // Only check for fields that are required to update
  if (!lastName && !email && !password) {
    return res.status(400).send('At least one field (lastName, email, or password) is required for update');
  }

  if (email && !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { firstName: firstName },
      { $set: { lastName, email, password } },
      { new: true }
    );
    return res.status(200).json({
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({ message: 'Server error', error });
  }
});

//* D => Delete
router.delete('/deleteUser/:name', async (req, res) => {
  const firstName = req.params.name;
  // const body = req.body;

  try {
    const deletedUser = await userModel.findOneAndDelete({ firstName }); //?If you intend to delete the user, you should use findOneAndDelete() or deleteOne(), not find(). You should also use an appropriate query to find the user by firstName.

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User Deleted Successfully',
      data: deletedUser,
    });
  } catch (error) {
    return res.status(500).send({ msg: 'server Error hai n' });
  }
});

module.exports = router;
