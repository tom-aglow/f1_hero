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

test('admin can create fake users', async () => {
	h.signIn();

	const num = 5;
	await h.admin.get(`/users/seed/${num}`);
	const User = mongoose.model('user');
	const users = await User.find();

	expect(users).toHaveLength(num + 1);
});

test("admin can create one fake user if he doesn't specify number of new users", async () => {
	h.signIn();

	await h.admin.get(`/users/seed`);
	const User = mongoose.model('user');
	const users = await User.find();

	expect(users).toHaveLength(2);
});

test('not admin cannot add new users', async () => {
	const user = await f.create('user');
	h.setUser(user);
	h.signIn();

	const error = await h.admin.get('/users/seed/5').catch(err => err.response);

	expect(error.status).toBe(401);
});
