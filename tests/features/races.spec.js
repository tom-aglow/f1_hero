const axios = require('axios');

const startServer = require('../../server');
const racesData = require('../seedsData/races');
const { populateRacesCollection } = require('../seeds');

const api = axios.create({
	baseURL: 'http://localhost:3002/api'
});

let server;

beforeAll(async () => {
	server = await startServer();
});

afterAll(done => {
	server.close(done);
});

beforeEach(async done => {
	await populateRacesCollection();
	done();
});

describe('GET /api/races', () => {
	it('should fetch all races in the season', async () => {
		const races = await api.get('/races').then(res => res.data.races);

		expect(races).toHaveLength(racesData.length);
	});
});
