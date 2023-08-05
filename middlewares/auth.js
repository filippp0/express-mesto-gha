const jwt = require('jsonwebtoken');
const env = require('dotenv').config();
const UnautorizedError = require('../errors/UnautorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, env.parsed.SECRET_KEY);
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }
  req.user = payload;
  next();
};
