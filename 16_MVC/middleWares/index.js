const fs = require('fs');

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile('log.txt', `\n${req.method} and ${req.url} and ${new Date()} \n`, (err, data) => {
      next();
    });
  };
}

module.exports = logReqRes;