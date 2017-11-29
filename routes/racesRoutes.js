const Race = require('mongoose').model('race');
const Pick = require('mongoose').model('pick');
const Driver = require('mongoose').model('driver');

module.exports = app => {
	
	//	return list of all races
	app.get('/api/races', async (req, res) => {
		const races = await Race.find({}).sort({round: 1}).select('alpha3code flagUrl round');
		
		res.send(races);
	});

	//	return list of all drivers
	app.get('/api/drivers', async (req, res) => {
		const drivers = await Driver.find({}).sort({number: 1}).select('code name');

		res.send(drivers);
	});
	
	//	return user's picks for the particular race
	app.get('/api/pick/:round', async (req, res) => {
		const race = await Race.findOne({round: req.params.round}).select();
		const pick = await Pick.find({_race: race._id}).populate('forecast._driver').select();	//TODO add filter by current user

		res.send(pick[0]);
	})
};
