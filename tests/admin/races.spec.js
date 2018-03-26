const moxios = require('moxios');
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

test('admin can fetch drivers list from API and store it in the database', async done => {
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
		done();
	});
});

test('not admin cannot change drivers data', async () => {
	const user = await f.create('user');
	h.setUser(user);
	h.signIn();

	const error = await h.admin.get('/races').catch(err => err.response);

	expect(error.status).toBe(401);
});
