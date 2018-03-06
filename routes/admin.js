const express = require('express');

const racesController = require('../controllers/admin/races');
const driversController = require('../controllers/admin/drivers');
const isAdmin = require('../middlewares/isAdmin');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAdmin, racesController.index);
	router.get('/drivers', isAdmin, driversController.index);

	return router;
};


