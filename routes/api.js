const express = require('express');

const racesController = require('../controllers/races');

module.exports = () => {
	const router = express.Router();

	router.get('/races', racesController.index);

	return router;
};

