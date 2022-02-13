

const speakers = require('./speakers');

function fetchSpeakers(_id) {
    return Array.from(speakers).find( ( {id} ) => id === _id);
}

module.exports = { fetchSpeakers }