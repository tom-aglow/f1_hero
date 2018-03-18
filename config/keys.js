/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
	module.exports = require('./env/prod.env');
} else if (process.env.NODE_ENV === 'test') {
	module.exports = require('./env/test.env');
} else {
	module.exports = require('./env/dev.env');
}
