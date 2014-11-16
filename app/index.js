var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('My port is ' + process.env.PORT + '\n');
}).listen(process.env.PORT);
console.log('Server running on port ' + process.env.PORT);
