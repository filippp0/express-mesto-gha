const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { emailRegex } = require('../utils/constants');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(emailRegex),
    password: Joi.string().required().min(3),
  }),
}), login);

module.exports = router;
