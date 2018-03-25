const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressSession = require('express-session');

const { COOKIE_SECRET } = require('./keys');

module.exports = () => {
	// Use application-level middleware for common functionality, including
	// logging, parsing, and session handling.
	const expressSessionOptions = {
		secret: COOKIE_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: {
			maxAge: 30 * 24 * 60 * 60 * 1000
		}
	};

	return [
		cors(),
		cookieParser(),
		bodyParser.urlencoded({ extended: true }),
		bodyParser.json(),
		expressSession(expressSessionOptions)
	];
};
