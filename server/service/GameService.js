const crypto = require("crypto");

const { error, log } = require('../util/logger');
const cache = require('../util/cache');

const Game = require('../model/Game');
const MineSweeper = require('../model/MineSweeper');

/**
 *
 */
const create = async (userId, name, size, quantity) => {
  try {
    log(`GameService : Game create [u: ${userId}, n: ${name}]`);
    const build = MineSweeper.build(size, quantity);

    const game = new Game({ ...build, name });
    await game.save();

    const gameId = game._id.toString();

    // register it on redis to make it fast to fetch
    await cache.set(gameId, game.toJSON());

    return game.toJSON();
  } catch (err) {
    error(`GameService : Error while creating game for ${name}`, err);
    throw err;
  }
};

/**
 * To get a game by id
 * @param {string} gameId
 */
const get = async (gameId, asModel) => {
  if (!gameId) throw new Error(`Game id is required. Got g:${gameId}`);
  try {
    let game = await cache.get(gameId);
    if (game) return asModel ? Game.hydrate(game) : game;

    // Game not found in cache, fetch it
    game = await Game.findById(gameId).exec();

    if (!game) {
      throw new Error(`404: Game not found g:${gameId}`);
    }

    await cache.set(gameId, game.toJSON());

    return asModel ? game : game.toJSON();
  } catch (err) {
    error(`GameService : Error while loading game for ${gameId}`, err);
    throw err;
  }
};


const play = async (gameId, row, col) => {
  if (!gameId) throw new Error(`400: Game id is required. Got p:${gameId}`);
  const game = await get(gameId, true);

  if (!game) {
    throw new Error(`404: Game not found g:${gameId}`);
  }

  const { board, mines, movesLeft, gameOver } = MineSweeper.play(row, col, game.toJSON());

  game.board = board;
  game.movesLeft = movesLeft;
  game.gameOver = gameOver;

  await game.save();
  await cache.set(gameId, game.toJSON());

  return game;
}

module.exports = {
  create,
  get,
  play,
};
