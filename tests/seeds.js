const mongoose = require('mongoose');

const drivers = require('./seedsData/drivers');

const populateDriversCollection = done => {
	const Driver = mongoose.model('driver');

	Driver.remove()
		.then(() => Driver.insertMany(drivers))
		.then(() => done());
};

module.exports = { populateDriversCollection };
