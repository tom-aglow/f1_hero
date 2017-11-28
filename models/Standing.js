const mongoose = require('mongoose');
const { Schema } = mongoose;

const standingSchema = new Schema({
  position: {
  	type: Number,
		required: true
	},
	_driver: { type: Schema.Types.ObjectId, ref: 'driver' },
	score: {
		type: Number,
		default: 0
	}
});

module.exports = standingSchema;

// mongoose.model('standing', standingSchema);
