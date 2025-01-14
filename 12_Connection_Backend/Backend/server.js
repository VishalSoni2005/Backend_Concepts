const express = require('express');
const data = require('./MOCK_DATA .json');

// console.log(data);// array of objects

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from the server, this is home page');
});

app.get('/about', (req, res) => {
  res.send('Hello from the server, this is about page');
});

app.get('/api/name', (req, res) => {
    res.send(data);         //!
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

