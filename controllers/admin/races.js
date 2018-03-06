const mongoose = require('mongoose');
const axios = require('axios');

const {castCountry, getCountryFlag} = require('../../utils/adminRoutesHelpers');

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


