const http = require('http');
const url = require('url');
const services = require('./services');


const server = http.createServer();

server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchSpeakers(id);
        console.log(metadata);
        console.log("-------------------------------");
        console.log(request.headers);
    }
    // console.log(parsedUrl);
});

server.listen(8080);