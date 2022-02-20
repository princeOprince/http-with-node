const axios = require('axios');
const fs = require('fs');

// axios.get('http://www.google.com')
axios({
    // method: 'get',
    method: 'post',
    url: 'http://localhost:8080/users',
    data: {
        userName: 'princeOprince'
    },
    transformRequest: (data, headers) => {
        // const newData = data.userNames.map( userName => userName + '!' );
        const newData = {
            userName: data.userName + '!'
        };
        return JSON.stringify(newData);
    }
})
    .then((response) => {
        response.data.pipe(fs.createWriteStream('google.html'));
    })
    .catch((error) => {
        console.error(error);
    });

const getMetadata = () => axios.get('http://localhost:8080/metadata?id=381b010e-f51d-4fca-a249-271f72a6a5b9');

const getMetadataAgain = () => axios.get('http://localhost:8080/metadata?id=aa24b5ca-5b96-4657-909e-e5be82ebf891');

axios.all([
    getMetadata(), getMetadataAgain()
]).then((responseArray) => {
    console.log(responseArray[0].data.bio);
    console.log(responseArray[1].data.bio);
});
