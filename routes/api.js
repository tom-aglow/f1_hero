const express = require('express');

const racesController = require('../controllers/races');
const isAuth = require('../middlewares/isAuth');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAuth, racesController.index);

	return router;
};

