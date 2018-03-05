const express = require('express');

const racesController = require('../controllers/races');
const driversController = require('../controllers/drivers');
const isAuth = require('../middlewares/isAuth');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAuth, racesController.index);
	router.get('/drivers', isAuth, driversController.index);

	return router;
};

