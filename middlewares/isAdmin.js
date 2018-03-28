module.exports = (req, res, next) => {
	if (!req.user || req.user.username !== 'tom_aglow') {
		return res
			.status(401)
			.send({ error: 'you have no privileges to perform this action' });
	}

	next();
	return null;
};
