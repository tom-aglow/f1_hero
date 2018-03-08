const axios = require('axios');

const startServer = require('../../server');
const { clearAllCollections } = require('../utils');
const f = require('../factories');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });

let server;
let user;

beforeAll(async done => {
	server = await startServer();
	done();
});

afterAll(done => {
	server.close(done);
});

beforeEach(async done => {
	clearAllCollections();
	user = await f.create('user');
	done();
});

describe('GET /api/races', () => {
	it('should fetch all races in the season', async () => {
		await f.create('race');
		const response = await api.get('/races').then(res => res.data.races);

		expect(response).toHaveLength(1);
	});
});

describe('GET /api/drivers', () => {
	it('should return all drivers in correct format', async () => {
		const { id, code, name } = await f.create('driver');
		const response = await api.get('/drivers').then(res => res.data.drivers);

		expect(response).toHaveLength(1);
		expect(response).toContainEqual({ _id: id, code, name });
	});
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
