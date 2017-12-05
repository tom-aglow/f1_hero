const mongoose = require('mongoose');
const { Schema } = mongoose;
const StandingSchema = require('./Standing');

const pickSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'user' },
  _race: { type: Schema.Types.ObjectId, ref: 'race' },
  forecast: [StandingSchema],
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

mongoose.model('pick', pickSchema);
