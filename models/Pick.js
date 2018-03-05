const mongoose = require('mongoose');
const { Schema } = mongoose;
const getStandingSchema = require('./Standing');

module.exports = () => {
	const pickSchema = new Schema({
		_user: { type: Schema.Types.ObjectId, ref: 'user' },
		_race: { type: Schema.Types.ObjectId, ref: 'race' },
		forecast: [getStandingSchema()],
		status: {
			type: String,
			required: true,
			minlength: 1,
			default: 'new'
		},
		score: {
			type: Number,
			default: 0
		}
	});

	return pickSchema;
};
