const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const { MONGODB_URI, COOKIE_SECRET } = require('./config/keys');
require('./models/User');
require('./models/Race');
require('./models/Driver');
require('./models/Pick');
require('./services/passport');

//	DB CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI);

const app = express();

//	MIDDLEWARE

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
	require('express-session')({
		secret: COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	})
);

app.use(passport.initialize());
app.use(passport.session());

// 	ROUTES
require('./routes/authRoutes')(app);
require('./routes/serviceRoutes')(app);
require('./routes/racesRoutes')(app);

app.use('/assets', express.static('./_client/public/assets'));

//	production routes
if (
	process.env.NODE_ENV === 'production' ||
	process.env.NODE_ENV === 'server'
) {
	//	Express will serve up assets files (main.css, main.js)
	app.use('/assets', express.static('./_client/public/assets'));
	app.use('/images', express.static('./_client/public/assets/images'));

	//  Server side rendering
	require('babel-register');
	require('babel-polyfill');

	const React = require('react');
	const ReactDOMServer = require('react-dom/server');
	const ReactRouter = require('react-router-dom');
	const _ = require('lodash');
	const fs = require('fs');
	const ReactApp = require('./_client/src/App').default;

	const StaticRouter = ReactRouter.StaticRouter;
	const baseTemplate = fs.readFileSync('./_client/public/index.html');
	const template = _.template(baseTemplate);

	app.use((req, res) => {
		const context = {};
		const body = ReactDOMServer.renderToString(
			React.createElement(
				StaticRouter,
				{ location: req.url, context },
				React.createElement(ReactApp)
			)
		);

		if (context.url) {
			res.redirect(context.url);
		}

		res.write(template({ body }));
		res.end();
	});
}

//	PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`server is running at ${PORT}`);
});

module.exports = { app };
