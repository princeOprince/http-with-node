

const speakers = require('./speakers');

function fetchSpeakers(_id) {
    return Array.from(speakers).find( ( {id} ) => id === _id);
}

function createSpeaker(name) {
    console.log("saving...");
    console.log(`speaker "${name}" created...`);
}

module.exports = { fetchSpeakers, createSpeaker }