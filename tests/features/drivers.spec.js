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

test('user can fetch all drivers in correct format', async () => {
	h.signIn();
	const { id, code, name } = await f.create('driver');
	await f.create('driver');
	const response = await h.api.get('/drivers').then(res => res.data.drivers);

	expect(response).toHaveLength(2);
	expect(response).toContainEqual({ _id: id, code, name });
});

test('unauthenticated user cannot get drivers info', async () => {
	await f.create('driver');
	const error = await h.api.get('/drivers').catch(err => err.response);

	expect(error.status).toBe(401);
});
