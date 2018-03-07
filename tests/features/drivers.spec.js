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
	await f.create('user');
});

afterAll(done => {
	server.close(done);
});

describe('GET /api/drivers', () => {
	it('should return all drivers in correct format', async () => {
		const { id, code, name } = await f.create('driver');
		const response = await api.get('/drivers').then(res => res.data.drivers);

		expect(response).toHaveLength(1);
		expect(response).toContainEqual({ _id: id, code, name });
	});
});
