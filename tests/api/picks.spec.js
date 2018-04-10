const f = require('../../jest/utils/factories');
const h = require('../../jest/utils/helper');
const { docToObj } = require('../../jest/utils/functions');

const round = 1;
let race;

beforeAll(async done => {
	await h.beforeAll();
	done();
});

afterAll(async done => {
	await h.afterAll();
	done();
});

beforeEach(async done => {
	await h.beforeEach();
	race = await f.create('race', { round });
	done();
});

afterEach(async done => {
	await h.afterEach();
	done();
});

describe('GET /api/picks/:round', () => {
	test('user can fetch pick info', async () => {
		h.signIn();
		await f.create('pick', { _user: h.getUser()._id, _race: race._id });

		const response = await h.api
			.get(`/picks/${round}`)
			.then(res => res.data.pick);

		expect(response._race).toBe(race.id);
	});

	test('unauthenticated user cannot get pick info', async () => {
		const error = await h.api.get(`/picks/${round}`).catch(err => err.response);

		expect(error.status).toBe(401);
	});
});

describe('POST /api/picks/:round', () => {
	test('user can submit his race forecast', async () => {
		h.signIn();

		const driverOne = (await f.create('driver')).toObject();
		const driverTwo = (await f.create('driver')).toObject();

		const forecast = [
			{ position: 1, _driver: docToObj(driverTwo) },
			{ position: 2, _driver: docToObj(driverOne) }
		];

		const response = await h.api
			.post(`/picks/${round}`, {
				round,
				forecast
			})
			.then(res => res.data.pick);

		expect(response.forecast[0]._driver).toEqual(forecast[0]._driver);
		expect(response.forecast[1]._driver).toEqual(forecast[1]._driver);
	});

	test('request will fail if user provides incorrect data', async () => {
		h.signIn();

		const forecast = [{ position: 1, _driver: 1 }, { position: 2, _driver: 2 }];

		const error = await h.api
			.post(`/picks/${round}`, { round, forecast })
			.catch(err => err.response);

		expect(error.status).toBe(500);
	});

	test('unauthenticated user cannot post race forecast', async () => {
		const error = await h.api
			.post(`/picks/${round}`)
			.catch(err => err.response);

		expect(error.status).toBe(401);
	});
});
