const { log, error } = require('../../util/logger');
const loginRequired = require('../../middleware/LoginRequired');
const GameService = require('../../service/GameService');

const Game = app => {
  app.post('/api/game', loginRequired, create);
  app.get('/api/game', loginRequired, get);

  return app;
};

const get = async (req, res) => {
  const { gameId } = req.body;
  log(`API Game : get : about to get game [p: ${gameId}]`);

  try {
    const game = await GameService.get(gameId);
    if (!game) {
      return res
        .status(404)
        .send({error: 404, message: `Game ${gameId} not found`});
    }

    res.send(game);
  } catch (err) {
    error(`API Game : get : error on get game [p: ${gameId}]`, err);
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  const { user } = req;
  const { name } = req.body;

  log(`API Game : create : about to create game [n: ${name}]`);
  try {
    const game = await GameService.create(user._id, name);

    log(`API Game : create : game created [p: ${game._id}]`);

    res.send(game);
  } catch (err) {
    error(`API Game : create : error on create [n: ${name}]`, err);
    res.status(500).send(err);
  }
};

module.exports = Game;
