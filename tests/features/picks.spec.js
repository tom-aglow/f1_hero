const axios = require('axios');
const mongoose = require('mongoose');

const startServer = require('../../server');
const {
	populateRacesCollection,
	populateUsersCollection,
	clearCollection
} = require('../seeds');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });

let server;
let models;
let _user;

beforeAll(async () => {
	server = await startServer();
	models = {
		User: mongoose.model('user'),
		Race: mongoose.model('race'),
		Pick: mongoose.model('pick')
	};
});

afterAll(done => {
	server.close(done);
});

beforeEach(async done => {
	await populateUsersCollection();
	await populateRacesCollection();
	await clearCollection('pick');

	_user = await models.User.findOne().select('_id');

	done();
});

describe('GET /api/picks/:round', () => {
	it('should fetch pick info', async () => {
		const round = 1;
		const _race = await models.Race.findOne({ round }).select('_id');
		const pick = await models.Pick.create({
			_user,
			_race
		});

		const response = await api
			.get(`/picks/${round}`)
			.then(res => res.data.pick);

		expect(response._race).toEqual(_race.id);
	});
});
