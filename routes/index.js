const express = require('express');
const getApiRouter = require('./api');
const getAdminRouter = require('./admin');
const getAuthRouter = require('./auth');

module.exports = () => {
	const router = express.Router();

	router.use('/api', getApiRouter());
	router.use('/admin', getAdminRouter());
	router.use('/auth', getAuthRouter());

	return router;
};
