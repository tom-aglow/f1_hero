const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = () => {
	const driverSchema = new Schema({
		number: {
			type: Number,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true,
			minlength: 1
		},
		code: {
			type: String,
			required: true,
			minlength: 1
		}
	});

	return driverSchema;
};
