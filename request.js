// const http = require('http');
const https = require('https');

const data = JSON.stringify({
    userName: 'princeOprince'
});

const options = {
    hostname: 'localhost',
    // port: 8080,
    port: 443,
    path: '/users',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
        'Authorization': Buffer.from('myUsername' + ':' + 'myPassword').toString('base64')
    }
}

// const request = http.request(
const request = https.request(
// const request = https.get(
    // 'https://www.google.com',
    options,
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

request.write(data);

//  This method will be invoked automatically when https is used
request.end();