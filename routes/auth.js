const express = require('express');
const passport = require('passport');

const isAuth = require('../middlewares/isAuth');
const authController = require('../controllers/auth/auth');

module.exports = () => {
	const router = express.Router();

	router.get('/twitter', passport.authenticate('twitter'));
	router.get(
		'/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		authController.handleTwitterRedirect
	);

	router.get('/current-user', isAuth, authController.getCurrentUser);
	router.get('/logout', isAuth, authController.logout);

	return router;
};
