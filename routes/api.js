const express = require('express');

const racesController = require('../controllers/api/races');
const driversController = require('../controllers/api/drivers');
const picksController = require('../controllers/api/picks');
const leaderboardController = require('../controllers/api/leaderboard');
const isAuth = require('../middlewares/isAuth');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAuth, racesController.index);
	router.get('/drivers', isAuth, driversController.index);
	router.get('/picks/:round', isAuth, picksController.show);
	router.post('/picks/:round', isAuth, picksController.store);
	router.get('/leaderboard', isAuth, leaderboardController.index);

	return router;
};
