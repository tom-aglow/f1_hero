const mongoose = require('mongoose');

const driversData = require('./seedsData/drivers');
const racesData = require('./seedsData/races');
const usersData = require('./seedsData/users');

const populateUsersCollection = () => {
	const User = mongoose.model('user');

	User.remove().then(() => User.insertMany(usersData));
};

const populateDriversCollection = () => {
	const Driver = mongoose.model('driver');

	Driver.remove().then(() => Driver.insertMany(driversData));
};

const populateRacesCollection = () => {
	const Race = mongoose.model('race');

	return Race.remove().then(() => Race.insertMany(racesData));
};

const clearCollection = model => mongoose.model(model).remove();

const addPickToCollection = async () => {
	const Race = mongoose.model('race');
	const User = mongoose.model('user');
	const Driver = mongoose.model('driver');

	const races = await Race.find({});
	const user = await User.findOne();
	const raceIndex = Math.floor(Math.random() * races.length);

	return [
		{
			_user: user._id,
			_race: races[raceIndex]._id,
			status: 'calculated',
			forecast: [],
			score: 12
		}
	];
};

const populatePicksCollection = async () => {
	const Pick = mongoose.model('pick');
	const picks = await makePicks();

	console.log(picks);
	return Pick.remove().then(() => Pick.insertMany(picks));
};

module.exports = {
	populateDriversCollection,
	populateRacesCollection,
	addPickToCollection,
	populateUsersCollection,
	clearCollection
};
