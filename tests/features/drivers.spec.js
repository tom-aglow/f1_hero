/* eslint-disable one-var */
const axios = require('axios');
const passportStub = require('passport-stub-es6');

const startServer = require('../../server');
const { clearAllCollections } = require('../../jest/utils/functions');
const f = require('../../jest/utils/factories');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });

let server, user, app;

const signIn = u => passportStub.login(u);
const signOut = () => passportStub.logout();

beforeAll(async done => {
	({ server, app } = await startServer());
	passportStub.install(app);
	user = await f.create('user');
	done();
});

afterAll(done => {
	server.close(done);
});

beforeEach(async done => {
	clearAllCollections();
	signOut();
	done();
});

test('user can fetch all drivers in correct format', async () => {
	signIn(user);
	const { id, code, name } = await f.create('driver');
	await f.create('driver');
	const response = await api.get('/drivers').then(res => res.data.drivers);

	expect(response).toHaveLength(2);
	expect(response).toContainEqual({ _id: id, code, name });
});
