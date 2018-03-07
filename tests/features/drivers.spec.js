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

describe('GET /api/drivers', () => {
	it('should fetch all drivers', async () => {
		await f.create('driver');
		const response = await api.get('/drivers').then(res => res.data.drivers);

		expect(response).toHaveLength(1);
	});
});
