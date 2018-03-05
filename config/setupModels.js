const mongoose = require('mongoose');
const getRaceSchema = require('../models/Race');
const getPickSchema = require('../models/Pick');

module.exports = () => {
	const RaceSchema = getRaceSchema();
	mongoose.model('race', RaceSchema);

	const PickSchema = getPickSchema();
	mongoose.model('pick', PickSchema);
};

