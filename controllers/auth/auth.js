exports.getCurrentUser = (req, res) => {
	res.send({ user: req.user });
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};

exports.handleTwitterRedirect = (req, res) => {
	res.redirect('/');
};
