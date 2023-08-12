const jwt = require('jsonwebtoken');
const UnautorizedError = require('../errors/UnautorizedError');

const { SECRET_KEY = 'mesto' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnautorizedError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnautorizedError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
