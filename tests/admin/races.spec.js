const moxios = require('moxios');
const mongoose = require('mongoose');
const h = require('../../jest/utils/helper');
const f = require('../../jest/utils/factories');

beforeAll(async done => {
	await h.beforeAll();
	done();
});

afterAll(async done => {
	await h.afterAll();
	done();
});

beforeEach(async done => {
	await h.beforeEach({ isAdmin: true });
	done();
});

afterEach(async done => {
	await h.afterEach();
	done();
});

describe('GET /admin/races', () => {
	test('admin can fetch race list from API and store it in the database', async () => {
		const numRaces2017 = 20;

		h.signIn();

		moxios.stubRequest(/thebasetrip/, {
			status: 200,
			response: {
				basic: {
					flag: { svg: 'foo' },
					code: { alpha3: 'BAR' }
				}
			}
		});

		moxios.wait(async () => {
			const response = await h.admin.get('/races').then(res => res.data.races);
			expect(response).toHaveLength(numRaces2017);
		});
	});

	test('not admin cannot change race data', async () => {
		const user = await f.create('user');
		h.setUser(user);
		h.signIn();

		const error = await h.admin.get('/races').catch(err => err.response);

		expect(error.status).toBe(401);
	});
});

describe('GET /admin/races/:round/score', () => {
	test("admin can calculate user's scores", async () => {
		const round = 1;
		const Race = mongoose.model('race');
		const Pick = mongoose.model('pick');

		h.signIn();
		const _user = await f.create('user');
		const _race = await Race.findOne({ round });
		const driverOne = await f.create('driver', { number: 5 });
		const driverTwo = await f.create('driver', { number: 44 });
		const driverThree = await f.create('driver', { number: 99 });

		const forecast = [
			{ _driver: driverOne, position: 1 },
			{ _driver: driverTwo, position: 5 },
			{ _driver: driverThree, position: 3 }
		];

		await f.create('pick', { _race, _user, forecast });

		const response = await h.admin
			.get(`races/${round}/score`)
			.then(res => res.data);
		expect(response.status).toBe('done');

		expect(_race.isPassed).toBe(true);

		const pick = await Pick.findOne({ _race, _user });
		expect(pick.status).toBe('calculated');
		expect(pick.score).toBe(37);
	});

	test('not admin cannot calculate the scores', async () => {
		const user = await f.create('user');
		h.setUser(user);
		h.signIn();

		const error = await h.admin
			.get('/races/1/score')
			.catch(err => err.response);

		expect(error.status).toBe(401);
	});
});
