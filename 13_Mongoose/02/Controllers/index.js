const Users = require('../Models/ModelOne');

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await Users.find({}).select('id firstName lastName _id'); // Select only required fields
    const HTML = `
      <div>
        ${users
          .map(
            user => `
            <div>
              <h3>
                ${user.id} - ${user.firstName} ${user.lastName ? user.lastName : ''} - Your Unique ID is: ${user._id}
              </h3>
            </div>
          `
          )
          .join('')}
      </div>
    `;
    res.send(HTML);
  } catch (error) {
    res.status(500).send('An error occurred while fetching users');
  }
}

// Get a single user by ID
async function getUserById(req, res) {
  const id = req.params.id;

  try {
    const user = await Users.findById(id);
    if (!user) return res.status(404).send(`User with ID ${id} not found`);
    return res.status(200).send(user);
  } catch (error) {
    res.status(500).send('An error occurred while fetching the user');
  }
}

// Create a new user
async function createUser(req, res) {
  const { id, firstName, lastName, email } = req.body;

  try {
    if (!id || !firstName || !email) {
      return res.status(400).send('ID, firstName, and email are required');
    }

    const result = await Users.create({ id, firstName, lastName, email });
    console.log(result);
    return res.status(201).send(result);
  } catch (error) {
    res.status(500).send('An error occurred while creating the user');
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    const user = await Users.findByIdAndDelete(id);
    if (!user) return res.status(404).send(`User with ID ${id} not found`);
    return res.status(200).send(`User with ID ${id} has been deleted`);
  } catch (error) {
    res.status(500).send('An error occurred while deleting the user');
  }
}

// Update a user by ID
async function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const user = await Users.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!user) return res.status(404).send(`User with ID ${id} not found`);
    return res.status(200).send(`User with ID ${id} has been updated`);
  } catch (error) {
    res.status(500).send('An error occurred while updating the user');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
