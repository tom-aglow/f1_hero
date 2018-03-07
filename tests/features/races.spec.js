const axios = require('axios');

const startServer = require('../../server');
const { clearAllCollections } = require('../utils');
const f = require('../factories');

const api = axios.create({
	baseURL: 'http://localhost:3002/api'
});

let server;

beforeAll(async () => {
	server = await startServer();
	clearAllCollections();
	f.create('user');
});

afterAll(done => {
	server.close(done);
});

describe('GET /api/races', () => {
	it('should fetch all races in the season', async () => {
		await f.create('race');
		const response = await api.get('/races').then(res => res.data.races);

		expect(response).toHaveLength(1);
	});
});
