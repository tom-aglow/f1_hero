const mongoose = require('mongoose');

exports.index = async (req, res) => {
	const Driver = mongoose.model('driver');

	const drivers = await Driver.find({})
		.sort({ number: 1 })
		.select('code name');

	res.send({drivers});
};

