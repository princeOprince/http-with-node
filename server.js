const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const services = require('./services');
const jsonBody = require('body/json');
const formidable = require('formidable');


const server = http.createServer();
// const server = https.createServer({
//     key: fs.readFileSync('./key.pem'),
//     cert: fs.readFileSync('./cert.pem')
// });

server.on('request', (request, response) => {
    const parsedUrl = url.parse(request.url, true);
    if (request.method === 'GET' && parsedUrl.pathname === '/metadata') {
        const { id } = parsedUrl.query;
        const metadata = services.fetchSpeakers(id);
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200;
        const serialisedJSON = JSON.stringify(metadata);
        response.write(serialisedJSON);
        response.end();
        console.log("-------------------------------");
        console.log(request.headers);
    }
    //  #region USE THE JSON BODY PACKAGE
    else if (request.method === 'POST' && parsedUrl.pathname === '/users') {
        jsonBody(request, response, (err, body) => {
            if (err) {
                console.log(err)
            }
            else {
                services.createSpeaker(body['userName']);
            }
        });
    }
    // #endregion
    //  #region USE THE FORMIDABLE PACKAGE
    else if (request.method === 'POST' && parsedUrl.pathname === '/upload') {
        const form = new formidable.IncomingForm();
        form.parse(request, (err, fields, files) => {
            console.log('\n fields:');
            console.log(fields);
            console.log('\n files:');
            console.log(files);
            response.statusCode = 200;
            response.end("Success!");
        });
    }
    //   #endregion
    else {
        fs.createReadStream("./index.html").pipe(response);
    }
    // #region SET HEADERS AND STATUS CODES
    /*
    else {
        // response.statusCode = 404;
        // response.setHeader('X-Powered-By', 'Node');
        // response.setHeader('Hello', 'World');
        response.writeHead(404, {
            'X-Powered-By': 'Node',
            'Content-Type': 'application/json'
        });
        response.end();
    }
    */
    // #endregion

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

    // response.end('This was served with https');
});

server.listen(8080);
// server.listen(443);