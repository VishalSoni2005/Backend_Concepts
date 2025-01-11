const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

// routes 

app.get('/api/users', (req, res) => {
    res.json(users);
});

//! rendering html file
app.get('/users', ( (req, res) => {
    const ele = `
    <ul>
        ${users.map( (name) => `<li>${name.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(ele);
}))

//TODO: Dynamic path params

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find( (user) => user.id === id);
    return res.json(user);
})

// ! Creating new user

app.post('/api/users', (req, res) => {
    
})

//! Edidting user 
app.patch('/api/users/:id', (req, res) => { // editing user with id of user

})

//! Deleting user 
app.delete('/api/users/:id', (req, res) => { // deleting user with id of user

})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
