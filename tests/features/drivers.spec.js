const axios = require('axios');

const startServer = require('../../server');
const driversData = require('../seedsData/drivers');
const { populateDriversCollection } = require('../seeds');

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
	await populateDriversCollection();
	done();
});

describe('GET /api/drivers', () => {
	it('should fetch all drivers', async () => {
		const drivers = await api.get('/drivers').then(res => res.data.drivers);
		const driversSnap = drivers.map(({ code, name }) => ({ code, name }));

		expect(drivers).toHaveLength(driversData.length);
		expect(driversSnap).toMatchSnapshot();
	});
});
