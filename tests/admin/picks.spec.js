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

test('admin can create picks for fake users', async () => {
	h.signIn();

	const usersNum = 5;
	const round = 1;

	const _race = await f.create('race', { round });
	await h.admin.get(`/users/seed/${usersNum}`);
	await h.admin.get(`/picks/seed/${round}`);

	const Pick = mongoose.model('pick');
	const picks = await Pick.find({ _race });

	expect(picks).toHaveLength(usersNum);
});

test('not admin cannot add new users', async () => {
	const user = await f.create('user');
	h.setUser(user);
	h.signIn();

	const error = await h.admin.get('/picks/seed/1').catch(err => err.response);

	expect(error.status).toBe(401);
});
