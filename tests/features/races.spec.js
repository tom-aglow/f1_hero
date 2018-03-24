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

test('user can fetch all races in the season', async () => {
	signIn(user);
	await f.create('race');
	await f.create('race');
	const response = await api.get('/races').then(res => res.data.races);

	expect(response).toHaveLength(2);
});

test('unauthenticated user cannot get races info', async () => {
	await f.create('race');
	const error = await api.get('/races').catch(err => err.response);

	expect(error.status).toBe(401);
});
