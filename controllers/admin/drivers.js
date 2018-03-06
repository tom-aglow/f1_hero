const mongoose = require('mongoose');
const axios = require('axios');

exports.index = async (req, res) => {
	const Driver = mongoose.model('driver');

	//	get list of drivers from API
	const drivers = (await axios.get(
		'http://ergast.com/api/f1/2017/drivers.json'
	)).data.MRData.DriverTable.Drivers;

	//	create driver documents
	drivers.forEach(
		async ({ permanentNumber, givenName, familyName, code }) => {
			(await new Driver({
				code,
				name: givenName.charAt(0) + '. ' + familyName,
				number: permanentNumber
			})).save();
		}
	);

	res.status(200).send({drivers});
};


