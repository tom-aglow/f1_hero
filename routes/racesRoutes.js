const Race = require('mongoose').model('race');

module.exports = app => {
	app.get('/api/races', async (req, res) => {
		const races = await Race.find({}).select('alpha3code flagUrl');
		res.send(races);
	})
};
