const mongoose = require('mongoose');

const drivers = require('./seedsData/drivers');
const races = require('./seedsData/races');

const populateDriversCollection = done => {
	const Driver = mongoose.model('driver');

	Driver.remove()
		.then(() => Driver.insertMany(drivers))
		.then(() => done());
};

const populateRacesCollection = done => {
	const Race = mongoose.model('race');

	Race.remove()
		.then(() => Race.insertMany(races))
		.then(() => done());
};

module.exports = { populateDriversCollection, populateRacesCollection };
