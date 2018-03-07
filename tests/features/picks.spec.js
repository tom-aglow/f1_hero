const axios = require('axios');

const startServer = require('../../server');
const { clearAllCollections } = require('../utils');
const f = require('../factories');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });

let server;
let user;

beforeAll(async done => {
	server = await startServer();
	clearAllCollections();
	user = await f.create('user');
	done();
});

afterAll(done => {
	server.close(done);
});

describe('GET /api/picks/:round', () => {
	it('should fetch pick info', async () => {
		const round = 1;
		const race = await f.create('race', { round });
		const pick = await f.create('pick', { _user: user._id, _race: race._id });

		const response = await api
			.get(`/picks/${round}`)
			.then(res => res.data.pick);

		expect(response._race).toBe(race.id);
	});
});
