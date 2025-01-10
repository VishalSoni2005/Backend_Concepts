const http = require('http');
const fs = require('fs');

// Example One
// const server = http.createServer((req, res) => {
//     console.log("Request was made: ", req.url);
//     res.end("Welcome to my server");    
// })

// Example two 
// const server = http.createServer( (req, res) => {
//     // making a log file to keep track of user
//     const log = `${new Date()} : New request for ${req.url}\n`;
//     fs.appendFile('log.txt', log, (err, data) => {
//         res.end("Hello from server ji");
//     })
// })

// example three
// const server = http.createServer( (req, res) => {
//     let log = `${new Date()} : New request for ${req.url}\n`;
//     fs.appendFile('log.txt', log, (err, data) => {
//         switch(req.url) {
//             case '/':
//             res.end("Welcome to my server");
//             break;
//         case '/about':
//             res.end("Welcome to my about page");
//             break;
//         default:
//             res.end("404 page not found");
//             break;
//         }
//     })

// example four how to remove constant /favicon.ico 
const server = http.createServer( (req, res) => {
    if(req.url === '/favicon.ico') return res.end();
    let log = `${new Date()} : New request for ${req.url}\n`;
    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url) {
            case "/":
                res.end("Welcome to my server");
                break;
            case "/about":
                res.end("Welcome to my about page");
                break;
            default:
                res.end("404 page not found");
                break;
        }
    })
        
})

server.listen(5000, () => { // port number is given follow with a call back fn
    console.log("My server set sucessfully");
    
})