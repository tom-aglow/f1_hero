/* eslint-disable no-use-before-define */
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const { capitalizeFirstLetter } = require('../../utils/functions');

const self = {
	createRace,
	createUser,
	createDriver,
	createPick
};

function create(model, fields = {}) {
	const fn = self[`create${capitalizeFirstLetter(model)}`];
	if (typeof fn === 'function') {
		return fn(fields);
	}
	throw new FactoryException(model);
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
		_user: fields._user || (await self.createUser()),
		_race: fields._race || (await self.createRace()),
		forecast: [],
		...fields
	});
}

function FactoryException(model) {
	this.message = `A factory wasn't registered for the model "${model}"`;
}

const factory = {
	create
};

module.exports = factory;
