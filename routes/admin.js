const express = require('express');

const racesController = require('../controllers/admin/races');
const isAdmin = require('../middlewares/isAdmin');

module.exports = () => {
	const router = express.Router();

	router.get('/races', isAdmin, racesController.index);

	return router;
};


