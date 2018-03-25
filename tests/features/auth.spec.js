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

test('user can fetch information about himself', async () => {
	h.signIn();
	const response = await h.auth.get('/current-user').then(res => res.data.user);

	expect(response).toMatchObject(docToObj(h.getUser().toObject()));
});

test('unauthenticated user cannot get user info', async () => {
	const error = await h.auth.get('/current-user').catch(err => err.response);

	expect(error.status).toBe(401);
});
