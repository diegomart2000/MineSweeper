const mongoose = require('../util/mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  userId: ObjectId,
  name: 'string',
  board: 'array',
  mines: 'array',
});

const Game = mongoose.model('Game', schema);
module.exports = Game;
