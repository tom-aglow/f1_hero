const express = require('express');

const racesController = require('../controllers/races');
const driversController = require('../controllers/drivers');
const picksController = require('../controllers/picks');
const isAuth = require('../middlewares/isAuth');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAuth, racesController.index);
	router.get('/drivers', isAuth, driversController.index);
	router.get('/picks/:round', isAuth, picksController.show);
	router.post('/picks/:round', isAuth, picksController.store);

	return router;
};

