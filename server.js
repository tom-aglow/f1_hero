const express = require('express');
const path = require('path');

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

	// Express only serves static assets in production
	if (process.env.NODE_ENV === 'production') {
		//	Express will serve up assets files (main.css, main.js)
		app.use(express.static('_client/public'));

		//	Express will serve up the index.html file if it doesn't recognize the route
		app.get('*', (req, res) => {
			res.sendFile(path.resolve(__dirname, '_client', 'public', 'index.html'));
		});
	}

	//	SERVER START
	return new Promise(resolve => {
		const port = process.env.PORT || 3001;
		const server = app.listen(port, () => {
			console.log(`Find the server at: http://localhost:${port}/`); // eslint-disable-line no-console
			server.on('close', () => cleanupMongoose());
			resolve({ server, app });
		});
	});
};

if (process.env.NODE_ENV !== 'test') {
	start();
}

module.exports = start;
