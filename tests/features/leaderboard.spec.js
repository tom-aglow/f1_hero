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

afterEach(async done => {
	await h.afterEach();
	done();
});

test('user can fetch other users results', async () => {
	h.signIn();

	const userOne = await f.create('user');
	await f.create('pick', {
		_user: userOne._id,
		status: 'calculated',
		score: 10
	});

	const userTwo = await f.create('user');
	await f.create('pick', {
		_user: userTwo._id,
		status: 'calculated',
		score: 20
	});

	const response = await h.api
		.get('/leaderboard')
		.then(res => res.data.leaderboard);

	expect(response).toHaveLength(3);
});

test('unauthenticated user cannot get races info', async () => {
	const error = await h.api.get('/leaderboard').catch(err => err.response);

	expect(error.status).toBe(401);
});
