const mongoose = require('mongoose');

exports.index = async (req, res) => {
	const Race = mongoose.model('race');

	const races = await Race.find().select();

	res.send({ races });
};

