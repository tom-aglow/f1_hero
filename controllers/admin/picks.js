const f = require('../../jest/utils/factories');
const mongoose = require('mongoose');

exports.seed = async (req, res) => {
	const { round } = req.params;

	const User = mongoose.model('user');
	const Race = mongoose.model('race');
	const Driver = mongoose.model('driver');

	const fakeUsers = await User.find({ twitterID: /fake-/i });
	const _race = await Race.findOne({ round }).select('_id');
	const _drivers = await Driver.find({}).select('_id');

	fakeUsers.forEach(async _user => {
		const forecast = [];
		const drivers = _drivers.slice();

		//	populate forecast array
		for (let i = 0; i < 10; i += 1) {
			const index = Math.floor(Math.random() * drivers.length);

			forecast.push({
				position: i + 1,
				_driver: drivers[index]
			});

			drivers.splice(index, 1);
		}

		await f.create('pick', { _user, _race, forecast });
	});

	res.status(200).send({ status: 'done' });
};
