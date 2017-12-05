const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  twitterID: {
    type: String,
    unique: true,
    minlength: 1
  },
  username: {
    type: String,
    minlength: 1
  }
});

mongoose.model('user', userSchema);
