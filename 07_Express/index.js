// const http = require('http');
const express = require('express');

const app = express(); // this app becoms handler function

app.get('/', (req, res) => {
  return res.end('Welcome to my server');
});
app.get('/about', (req, res) => {
  return res.end('Welcome to my about page');
});
app.get('/search', (req, res) => {
  return res.end(`Welcome to my search page" + "your query is " + ${req.query.name}`);
});

app.listen(5080, () => {
  console.log('My server is running on port 5080');
});

// const server = http.createServer(app);

// server.listen(5080, () => {
//   console.log('My server is running on port 5080');
// });
