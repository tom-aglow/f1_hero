exports.getCurrentUser = async (req, res) => {
	res.send({ user: req.user });
};
