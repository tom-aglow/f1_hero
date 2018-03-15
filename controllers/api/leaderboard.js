const mongoose = require('mongoose');
const { getMaxFiveElements } = require('../../utils/functions');

exports.index = async (req, res) => {
	const User = mongoose.model('user');
	const Pick = mongoose.model('pick');

	//  fetch all users
	const users = await User.find().select();

	Promise.all(
		//  for every user fetch all pick with 'calculated' status
		users.map(async user => {
			const picks = await Pick.find({
				_user: user._id,
				status: 'calculated'
			}).select('score');
			const scores = picks.map(pick => pick.score);
			return { user: user.username, scores };
		})
	).then(results => {
		//  get top-5 element of scores array and calculate their sum
		results.map(result => {
			result.total = getMaxFiveElements(result.scores).reduce(
				(sum, value) => sum + value,
				0
			);
			return result;
		});

		//  sort results array by score value
		results.sort((a, b) => b.total - a.total);

		const formatedResults = results.map(({ user, total }, index) => ({
			user,
			total,
			index: index + 1
		}));

		//  return result array
		res.status(200).send({ leaderboard: formatedResults });
	});
};
