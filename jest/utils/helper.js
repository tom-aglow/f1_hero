/* eslint-disable one-var */
const axios = require('axios');
const passportStub = require('passport-stub-es6');

const startServer = require('../../server');
const { clearAllCollections } = require('./functions');
const f = require('./factories');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });
const auth = axios.create({ baseURL: 'http://localhost:3002/auth' });

let server, user, app;

function signIn() {
	passportStub.login(user);
}

function signOut() {
	passportStub.logout();
}

async function beforeAll() {
	({ server, app } = await startServer());
	passportStub.install(app);
}

function afterAll() {
	server.close();
}

async function afterEach() {
	return null;
}

async function beforeEach() {
	signOut();
	await clearAllCollections();
	user = await f.create('user');
}

function getUser() {
	return user;
}

const helper = {
	signIn,
	signOut,
	beforeAll,
	afterAll,
	beforeEach,
	afterEach,
	api,
	auth,
	getUser
};

module.exports = helper;
