const mongoose = require('mongoose');
const f = require('./factories');
const { clearCollection } = require('./functions');
const h = require('./helper');

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

describe("'clearCollection' functions", () => {
	it('clears up provided collection in db', async () => {
		const User = mongoose.model('user');
		let users = await User.find();

		expect(users).toHaveLength(1);

		await clearCollection('user');
		users = await User.find();
		expect(users).toHaveLength(0);
	});
});
