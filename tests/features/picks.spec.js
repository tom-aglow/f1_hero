const f = require('../../jest/utils/factories');
const h = require('../../jest/utils/helper');

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

describe('GET /api/picks/:round', () => {
	const round = 1;
	let race;

	beforeAll(async done => {
		race = await f.create('race', { round });
		await f.create('pick', { _user: h.getUser()._id, _race: race._id });
		done();
	});

	test('user can fetch pick info', async done => {
		h.signIn();

		const response = await h.api
			.get(`/picks/${round}`)
			.then(res => res.data.pick);

		expect(response._race).toBe(race.id);
		done();
	});

	test('unauthenticated user cannot get pick info', async done => {
		const error = await h.api.get(`/picks/${round}`).catch(err => err.response);

		expect(error.status).toBe(401);
		done();
	});
});
