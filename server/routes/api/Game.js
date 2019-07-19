const { log, error } = require('../../util/logger');
const loginRequired = require('../../middleware/LoginRequired');
const GameService = require('../../service/GameService');

const Game = app => {
  app.post('/api/game', loginRequired, create);
  app.get('/api/game/:gameId', loginRequired, get);
  app.patch('/api/game/:gameId', loginRequired, play);
  app.patch('/api/game/flag/:gameId', loginRequired, flag);

  return app;
};

const toResponse = ({ _id, board, movesLeft }) => ({ _id, board, movesLeft });

const get = async (req, res) => {
  const { gameId } = req.params;
  log(`API Game : get : about to get game [g: ${gameId}]`);

  try {
    const game = await GameService.get(gameId);
    if (!game) {
      return res
        .status(404)
        .send({error: 404, message: `Game ${gameId} not found`});
    }

    res.send(toResponse(game));
  } catch (err) {
    error(`API Game : get : error on get game [g: ${gameId}]`, err);
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  const { user } = req;
  const { name, size, mines } = req.body;

  log(`API Game : create : about to create game [n: ${name}]`);
  try {
    const game = await GameService.create(user._id, name, size, mines);

    log(`API Game : create : game created [g: ${game._id}]`);

    res.send(toResponse(game));
  } catch (err) {
    error(`API Game : create : error on create [n: ${name}]`, err);
    res.status(500).send(err);
  }
};

const play = async (req, res) => {
  const { gameId } = req.params;
  const { row, col } = req.body;

  log(`API Game : get : about to play game [g: ${gameId}]`);

  try {
    const game = await GameService.play(gameId, row, col);
    if (!game) {
      return res
        .status(404)
        .send({ error: 404, message: `Game ${gameId} not found` });
    }

    console.table(game.board);
    res.send(toResponse(game));
  } catch (err) {
    error(`API Game : get : error on get game [g: ${gameId}]`, err);
    res.status(500).send(err);
  }
};

const flag = async (req, res) => {
  const { gameId } = req.params;
  const { row, col } = req.body;

  log(`API Game : get : about to plant a flag [g: ${gameId}]`);

  try {
    const game = await GameService.flag(gameId, row, col);
    if (!game) {
      return res
        .status(404)
        .send({ error: 404, message: `Game ${gameId} not found` });
    }

    console.table(game.board);
    res.send(toResponse(game));
  } catch (err) {
    error(`API Game : get : error on get game [g: ${gameId}]`, err);
    res.status(500).send(err);
  }
};
module.exports = Game;
