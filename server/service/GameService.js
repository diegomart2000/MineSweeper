const crypto = require("crypto");

const { error, log } = require('../util/logger');
const cache = require('../util/cache');

const Game = require('../model/Game');

/**
 *
 */
exports.create = async (userId, name, board, mines) => {
  try {
    log(`GameService : Game create [u: ${userId}, n: ${name}]`);
    const game = new Game({ name, board, mines });
    await game.save();

    const gameId = game._id.toString();

    // register it on redis to make it fast to fetch
    await cache.set(gameId, game.toJSON());

    return game;
  } catch (err) {
    error(`GameService : Error while creating game for ${gameName}`, err);
    throw err;
  }
};

/**
 * To get a game by id
 * @param {string} gameId
 */
exports.get = async (gameId) => {
  if (!gameId) throw new Error(`Game id is required. Got p:${gameId}`);
  try {
    let game = await cache.get(gameId);
    if (game) return game;

    // Game not found in cache, fetch it
    game = await Game.findById(gameId).exec();
    await cache.set(gameId, game.toJSON());

    return game;
  } catch (err) {
    error(`GameService : Error while loading game for ${gameId}`, err);
    throw err;
  }
};
