const express = require('express');
const isAuth = require('../middlewares/isAuth');
const usersController = require('../controllers/auth/users');

module.exports = () => {
	const router = express.Router();

	router.get('/current-user', isAuth, usersController.getCurrentUser);

	return router;
};
