const { ObjectID } = require('mongodb');
const {Race} = require('../../models/Race');

const populateRaces = done => {
  Race.remove({})
    .then(() => done());
};

module.exports = {populateRaces};