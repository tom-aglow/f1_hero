const f = require('../../jest/utils/factories');
const h = require('../../jest/utils/helper');
const { docToObj } = require('../../jest/utils/functions');

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
	done();
});

afterEach(async done => {
	await h.afterEach();
	done();
});

test('user can fetch all races in the season', async () => {
	h.signIn();
	await f.create('race', { round: 1 });
	const raceTwo = await f.create('race', { round: 2 });
	const driverOne = (await f.create('driver')).toObject();
	const driverTwo = (await f.create('driver')).toObject();
	const forecast = [
		{ position: 1, _driver: docToObj(driverTwo) },
		{ position: 2, _driver: docToObj(driverOne) }
	];
	const score = 10;
	await f.create('pick', {
		_user: h.getUser(),
		_race: raceTwo,
		forecast,
		score
	});

	const response = await h.api.get('/races').then(res => res.data.races);

	expect(response).toHaveLength(2);
	expect(response[0].hasPick).toBe(false);
	expect(response[0].score).toBe(undefined);
	expect(response[1].hasPick).toBe(true);
	expect(response[1].score).toBe(score);
});

test('unauthenticated user cannot get races info', async () => {
	const error = await h.api.get('/races').catch(err => err.response);

	expect(error.status).toBe(401);
});
