const axios = require('axios');
const faker = require('faker');

const User = require('mongoose').model('user');
const Race = require('mongoose').model('race');
const Driver = require('mongoose').model('driver');
const Pick = require('mongoose').model('pick');
const isAdmin = require('../middlewares/isAdmin');
const {
	castCountry,
	getCountryFlag,
	getForecastScore
} = require('../utils/adminRoutesHelpers');

const seedPicksTable = async (username, round) => {
	const _user = await User.findOne({ username }).select('_id');
	const _race = await Race.findOne({ round }).select('_id');
	const drivers = await Driver.find({}).select('_id');
	let forecast = [];

	//	populate forecast array
	for (let i = 0; i < 10; i++) {
		const index = Math.floor(Math.random() * drivers.length);

		forecast.push({
			position: i + 1,
			_driver: drivers[index]
		});

		drivers.splice(index, 1);
	}

	return await Pick.create({ _user, _race, forecast });
};

module.exports = app => {
	app.get('/api/seed', async (req, res) => {
		const races = await Race.find().select('_id');

		for (let i = 0; i < 20; i += 1) {
			const fakeName = faker.internet.userName();
			const user = await User.create({
				twitterID: `0000${i}`,
				username: fakeName
			});

			for (let j = 1; j <= races.length(); j++) {
				await seedPicksTable(user.username, j);
			}
		}

		res.status(200).send('');
	});
};
