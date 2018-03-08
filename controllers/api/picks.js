const mongoose = require('mongoose');

exports.show = async (req, res) => {
	const Race = mongoose.model('race');
	const Pick = mongoose.model('pick');

	const race = await Race.findOne({ round: req.params.round }).select();
	const pick = await Pick.findOne({ _race: race._id, _user: req.user._id })
		.populate('forecast._driver')
		.select();
	res.send({ pick });
};

exports.store = async (req, res) => {
	const Race = mongoose.model('race');
	const Pick = mongoose.model('pick');

	const { round, forecast } = req.body;
	const _user = req.user._id;
	const _race = await Race.findOne({ round }).select('_id');

	try {
		await Pick.create({ _user, _race, forecast });
		const pick = await Pick.findOne({ _race, _user })
			.populate('forecast._driver')
			.select();
		res.status(200).send({ pick });
	} catch (err) {
		res.status(500).send(err.message);
	}
};
