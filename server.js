const express = require('express');

const setupMongoose = require('./config/setupMongoose');
const setupModels = require('./config/setupModels');
const setupMiddleware = require('./config/setupMiddleware');
const { setupPassport } = require('./config/setupPassport');
const getRouter = require('./routes');

const start = async () => {
	//	DB SETUP
	const cleanupMongoose = await setupMongoose();
	await setupModels();

	//	CREATING AND CONFIGURING A SERVER
	const app = express();

	//	setup application level middleware
	app.use(...setupMiddleware());
	app.use(...setupPassport());

	// 	ROUTES
	app.use(getRouter());

	//	CLIENT CONFIG

	app.use('/assets', express.static('./_client/public/assets'));

	// Express only serves static assets in production
	if (
		process.env.NODE_ENV === 'production' ||
		process.env.NODE_ENV === 'server'
	) {
		app.use(express.static('client/build'));
		app.use('/images', express.static('./_client/public/assets/images'));
	}

	//	SERVER START
	return new Promise(resolve => {
		const port = process.env.PORT || 3001;
		const server = app.listen(port, () => {
			console.log(`Find the server at: http://localhost:${port}/`); // eslint-disable-line no-console
			server.on('close', () => cleanupMongoose());
			resolve(server);
		});
	});
};

if (process.env.NODE_ENV !== 'test') {
	start();
}

module.exports = start;
