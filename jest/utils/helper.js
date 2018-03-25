/* eslint-disable one-var */
const axios = require('axios');
const passportStub = require('passport-stub-es6');

const startServer = require('../../server');
const { clearAllCollections } = require('./functions');
const f = require('./factories');

const api = axios.create({ baseURL: 'http://localhost:3002/api' });

let server, user, app;

function signIn() {
	passportStub.login(user);
}

function signOut() {
	passportStub.logout();
}

async function beforeAll() {
	({ server, app } = await startServer());
	await clearAllCollections();
	passportStub.install(app);
	user = await f.create('user');
}

function afterAll() {
	server.close();
}

function beforeEach() {
	signOut();
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
	api,
	getUser
};

module.exports = helper;
