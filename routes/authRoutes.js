const passport = require('passport');

module.exports = app => {
	//	route handler to kick user to Twitter authentication
	app.get(
		'/auth/twitter',
		passport.authenticate('twitter')
	);

	//	route handler for Twitter callback
	app.get(
		'/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/');
		}
	);
	
	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	})
};
