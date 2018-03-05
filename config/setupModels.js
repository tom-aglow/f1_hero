const mongoose = require('mongoose');
const getRaceSchema = require('../models/Race');
const getPickSchema = require('../models/Pick');
const getDriverSchema = require('../models/Driver');

module.exports = () => {
	mongoose.model('race', getRaceSchema());
	mongoose.model('pick', getPickSchema());
	mongoose.model('driver', getDriverSchema());
};
