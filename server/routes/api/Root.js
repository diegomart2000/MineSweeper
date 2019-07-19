const { log, error } = require('../../util/logger');
const loginRequired = require('../../middleware/LoginRequired');
const jwt = require('jsonwebtoken');
const SALT = process.env.SALT;

const UserService = require('../../service/UserService');

const Root = app => {
  app.get('/', get);
  return app;
};

const get = (req, res) => {
  res.send(`
    Hola 😋!<BR>
    =========<BR>
    Welcome to the Node MineSweeper API.<BR>
    To know more about this project go to https://github.com/diegomart2000/MineSweeper 💣
  `);
};

module.exports = Root;
