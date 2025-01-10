const fs = require('fs')
const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return res.end()
  let log = `${new Date()} : New request for ${req.url}\n`

  const myUrl = url.parse(req.url, true)
  console.log(myUrl)

  fs.appendFile('log.txt', log, (err, data) => {
    switch (req.url) {
      case '/':
        res.end('Welcome to my server')
        break
      case '/about':
        res.end('Welcome to my about page')
        break
      case '/search':
        const search = myUrl.query.search_query
        res.end('You are searching for : ', search)
      default:
        res.end('404 page not found')
        break
    }
  })
})

server.listen(5000, () => {
  console.log('My server set sucessfully')
})
