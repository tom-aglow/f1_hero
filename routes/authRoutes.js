const passport = require('passport');

module.exports = app => {
	//	route handler to kick user to twitter authentication
	app.get(
		'/auth/twitter',
		passport.authenticate('twitter')
	);

	//	route handler for Google OAUTH callback
	app.get(
		'/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/');
			console.log(req);
		}
	);
};
