const mongoose = require('../util/mongoose');

const schema = new mongoose.Schema({
  email: 'string',
  password: 'string',
  name: 'string',
});

const User = mongoose.model('User', schema);
module.exports = User;
