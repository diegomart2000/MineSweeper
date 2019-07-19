const mongoose = require('../util/mongoose');
const { ObjectId } = mongoose.Schema.Types;

const schema = new mongoose.Schema({
  userId: ObjectId,
  name: String,
  size: Number,
  quantity: Number,
  board: Array,
  mines: Array,
  movesLeft: Number,
  gameOver: Boolean,
});

const Game = mongoose.model('Game', schema);
module.exports = Game;
