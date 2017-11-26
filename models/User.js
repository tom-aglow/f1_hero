const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/keys');

const userSchema = new Schema({
  twitterID: String
});


mongoose.model('user', userSchema);
