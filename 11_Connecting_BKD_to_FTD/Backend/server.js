import express from 'express';
import data from './MOCK_DATA.json' assert { type: 'json' };

const app = express();

app.get('/', function (req, res) {
  res.send('Hello from the server');
});

// console.log(data[4].id);  //todo data is now an array of objects

//? creating a server that return data accodeing to id
app.get('/api/tellme', function (req, res) {
  res.send(data); //todo parse method from the url module is used for parsing URL strings, which is unrelated to handling JSON data.
});

const port = process.env.PORT || 5173; //! this means that if .env file is not found, use 3000
app.listen(port, function () {
  console.log('Server is running on port', port);
});
