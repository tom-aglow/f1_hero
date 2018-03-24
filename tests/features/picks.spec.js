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

test('user can fetch pick info', async () => {
	signIn(user);
	const round = 1;
	const race = await f.create('race', { round });
	const pick = await f.create('pick', { _user: user._id, _race: race._id });

	const response = await api.get(`/picks/${round}`).then(res => res.data.pick);

	expect(response._race).toBe(race.id);
});
