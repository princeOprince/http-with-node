const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
    console.log('This is an incoming request');
});

server.listen(8080);