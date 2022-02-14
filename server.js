const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');


// const server = http.createServer();
const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
});

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

    //  #region USE THE JSON BODY PACKAGE
    /*
    jsonBody(request, response, (err, body) => {
        if (err) {
            console.log(err)
        }
        else {
            services.createSpeaker(body['userName']);
        }
    });
    */
    // #endregion

    response.end('This was served with https');
});

// server.listen(8080);
server.listen(443);