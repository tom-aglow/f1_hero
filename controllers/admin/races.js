const mongoose = require('mongoose');
const axios = require('axios');

const {castCountry, getCountryFlag, getForecastScore} = require('../../utils/adminRoutesHelpers');

exports.index = async (req, res) => {
	const Race = mongoose.model('race');

	const races = (await axios.get('http://ergast.com/api/f1/2017.json')).data
		.MRData.RaceTable.Races;

	//	create races documents
	races.forEach(async ({ round, raceName, date, Circuit }) => {
		const country = Circuit.Location.country;
		const { flagUrl, alpha3code } = await getCountryFlag(
			castCountry(country)
		);

		(await new Race({
			round,
			raceName,
			date,
			country,
			flagUrl,
			alpha3code
		})).save();
	});

	res.status(200).send({races});
};

exports.score = async (req, res) => {
	const Race = mongoose.model('race');
	const Pick = mongoose.model('pick');
	const { round } = req.params;

	//	fetch actual result from public API
	const results = (await axios.get(
		`http://ergast.com/api/f1/2017/${round}/results.json`
	)).data.MRData.RaceTable.Races[0].Results;

	//  change score property for every element of forecast array in every pick document
	const _race = await Race.findOne({ round }).select('_id');
	const picks = await Pick.find({ _race })
		.populate('forecast._driver')
		.select();

	picks.forEach(async pick => {
		const updatedForecast = getForecastScore(results, pick.forecast);
		const totalScore = updatedForecast.reduce(
			(sum, value) => sum + value.score,
			0
		);

		await pick
			.set({
				forecast: updatedForecast,
				score: totalScore,
				status: 'calculated'
			})
			.save();
	});

	await Race.findOneAndUpdate({ _id: _race }, { $set: { isPassed: true } });

	res.status(200).send({status: 'done'});
};
