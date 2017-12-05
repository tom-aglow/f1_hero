const mongoose = require('mongoose');
const { Schema } = mongoose;

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

mongoose.model('driver', driverSchema);
