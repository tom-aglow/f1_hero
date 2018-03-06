module.exports = (req, res, next) => {
	// if (!req.user) {
	//   return res.status(401).send({ error: 'You must log in!' });
	// }
	req.user = { _id: '5a1b7273d130823e543c82a9' };
	next();
};
