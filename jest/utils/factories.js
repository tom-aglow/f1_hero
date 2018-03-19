/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const faker = require('faker');

const { capitalizeFirstLetter } = require('../../utils/functions');

const factory = (function testFactory() {
	const self = {
		createRace,
		createUser,
		createDriver,
		createPick
	};

	const publicApi = {
		create
	};

	function create(model, fields = {}) {
		const fn = self[`create${capitalizeFirstLetter(model)}`];
		if (typeof fn === 'function') {
			return fn(fields);
		}
		return null;
	}

	function createRace(fields) {
		const Race = mongoose.model('race');

		return Race.create({
			round: faker.random.number(20),
			raceName: faker.random.words(3),
			country: faker.address.country(),
			date: faker.date.future(),
			alpha3code: `_${faker.address.countryCode()}`,
			flagUrl: faker.image.imageUrl(),
			...fields
		});
	}

	function createUser(fields) {
		const User = mongoose.model('user');

		return User.create({
			twitterID: faker.random.uuid(),
			username: faker.internet.userName(),
			...fields
		});
	}

	function createDriver(fields) {
		const Driver = mongoose.model('driver');
		const name = `${faker.name.firstName()} ${faker.name.lastName()}`;

		return Driver.create({
			number: faker.random.number(99),
			name,
			code: name.slice(0, 3).toUpperCase(),
			...fields
		});
	}

	async function createPick(fields) {
		const Pick = mongoose.model('pick');

		return Pick.create({
			_user: await self.createUser(),
			_race: await self.createRace(),
			forecast: [],
			...fields
		});
	}

	return publicApi;
})();

module.exports = factory;
