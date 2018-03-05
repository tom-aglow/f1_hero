const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = () => {
	const raceSchema = new Schema({
		round: {
			type: Number,
			required: true,
			unique: true
		},
		raceName: {
			type: String,
			required: true,
			minlength: 1
		},
		country: {
			type: String,
			required: true,
			minlength: 1
		},
		date: {
			type: Date,
			required: true
		},
		flagUrl: {
			type: String,
			required: true,
			minlength: 1
		},
		alpha3code: {
			type: String,
			required: true,
			length: 3
		},
		isPassed: {
			type: Boolean,
			default: false
		}
	});

	return raceSchema;
};
