const express = require('express');
const getApiRouter = require('./api');
const getAdminRouter = require('./admin');

module.exports = () => {
	const router = express.Router();

	router.use('/api', getApiRouter());
	router.use('/admin', getAdminRouter());

	return router;
};

