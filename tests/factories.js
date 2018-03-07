/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
const faker = require('faker');

const { capitalizeFirstLetter } = require('../utils/functions');

const factory = (function testFactory() {
	const self = {
		createRace,
		createUser
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

	return publicApi;
})();

module.exports = factory;
