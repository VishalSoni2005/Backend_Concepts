const express = require('express');
const router = express.Router();
const {getAllUsers, getUserById, createUser, deleteUser, updateUser} = require('../Controllers/index');

//router routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/api', createUser); // user is created and appended to the database
router.delete('/:id', deleteUser);
router.put('/:id', updateUser); // user is updated in the database


module.exports = router;
