const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 3000;

// routes 

app.get('/api/users', (req, res) => {
    res.json(users);
});

// rendering html file
app.get('/users', ( (req, res) => {
    const ele = `
    <ul>
        ${users.map( (name) => `<li>${name.first_name}</li>`).join('')}
    </ul>
    `
}))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
