// const http = require('http');
const https = require('https');

// const request = http.request(
const request = https.get(
    'https://www.google.com',
    (response) => {
        console.log(`statusCode: ${response.statusCode}`);
        console.log(response.headers);

        response.on('data', (chunk) => {
            console.log('This is a chunk: \n');
            console.log(chunk.toString());
        })
    }
);

request.on('error', (err) => {
    console.log(err);
});

//  This method will be invoked automatically when https is used
// request.end();