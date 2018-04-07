const express = require('express');

const racesController = require('../controllers/admin/races');
const driversController = require('../controllers/admin/drivers');
const usersController = require('../controllers/admin/users');
const picksController = require('../controllers/admin/picks');
const isAdmin = require('../middlewares/isAdmin');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAdmin, racesController.fetchAndStore);
	router.get('/drivers', isAdmin, driversController.fetchAndStore);
	router.get('/races/:round/score', isAdmin, racesController.calculateScores);
	router.get('/users/seed/:num', isAdmin, usersController.seed);
	router.get('/picks/seed/:round', isAdmin, picksController.seed);

	return router;
};
