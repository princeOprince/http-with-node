const http = require('http');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');


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

    // #region ADD REQUEST BODY
    /*
    const body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        const parsedJSON = JSON.parse(Buffer.concat(body));
        const name = parsedJSON[5]['name'];
        console.log(name);
        services.createSpeaker(name);
    })
    */
    //  #endregion
    // console.log(parsedUrl);

    jsonBody(request, response, (err, body) => {
        if (err) {
            console.log(err)
        }
        else {
            services.createSpeaker(body['userName']);
        }
    });
});

server.listen(8080);