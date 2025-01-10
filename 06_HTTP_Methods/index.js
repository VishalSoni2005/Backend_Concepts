const fs = require('fs');
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return res.end();
  const log = `${new Date()} : ${req.method} New request for ${req.url}\n`;
  const myUrl = url.parse(req.url, true);
  fs.appendFile('log.txt', log, (err, data) => {
    if (err) {
      res.statusCode = 500;
      return res.end('Internal Server Error');
    }
    switch (myUrl.pathname) {
      case '/':
        res.end('WELCOME TO HOME PAGE');
        break;
      case '/about':
        res.end('I AM VISHAL SONI AND THIS IS MY ABOUT PAGE');
        break;
      case '/search':
        const search = myUrl.query.search_query;
        res.end('YOU ARE SEARCHING FOR : ', search);
        break;
      case '/signup':
        if(req.method === "GET") res.end(" You are trying to get data\n this is form");
        else if(req.method == "POST") {
            // DATABASE QUERY
            res.end("SuckSex")
        }
      default:
        res.end('404 PAGE NOT FOUND');
        break;
    }
  });
});

server.listen(5080, () => {
  console.log('My server is running on port 5080');
});
