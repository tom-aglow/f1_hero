const mongoose = require('mongoose');
const getRaceSchema = require('../models/Race');

module.exports = () => {
	const RaceSchema = getRaceSchema();
	mongoose.model('race', RaceSchema);
};

