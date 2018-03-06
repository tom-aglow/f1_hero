const mongoose = require('mongoose');

exports.index = async (req, res) => {
	const Race = mongoose.model('race');
	const Pick = mongoose.model('pick');

	const races = await Race.find()
		.sort({ round: 1 })
		.lean()
		.select('alpha3code flagUrl round isPassed');

	const picks = await Pick.find({
		_user: req.user._id
	}).select('_race score');

	races.map(race => {
		const pick = picks.filter(
			pick => String(pick._race) === String(race._id)
		)[0];
		if (pick && pick.score > 0) {
			race.score = pick.score;
		}
		race.hasPick = !!pick;
		return race;
	});

	setTimeout(() => res.send({races}), 500);
};

