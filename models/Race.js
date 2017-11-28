const mongoose = require('mongoose');
const { Schema } = mongoose;

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
	}
});


mongoose.model('race', raceSchema);
