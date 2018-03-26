const h = require('../../jest/utils/helper');
const mongoose = require('mongoose');

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

it('fetches drivers list from API and store it in the database', async () => {
	const response = await h.admin.get('/drivers').then(res => res.data.drivers);
	const Driver = mongoose.model('driver');
	const drivers = await Driver.find();

	expect(response).toHaveLength(drivers.length);
});
