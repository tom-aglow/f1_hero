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

	const mappedRaces = races.map(race => {
		const pick = picks.filter(
			item => String(item._race) === String(race._id)
		)[0];

		const score = pick && pick.score > 0 ? pick.score : undefined;
		const hasPick = !!pick;

		return Object.assign({}, race, { score, hasPick });
	});

	res.send({ races: mappedRaces });
	// setTimeout(() => res.send({ races: mappedRaces }), 500);
};
