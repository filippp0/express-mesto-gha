const mongoose = require('mongoose');
const User = require('../models/user');
const {
  badRequestStatus, notFoundStatus, serverErrorStatus, createdStatus, okStatus,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.status(okStatus).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id: ${req.params.userId}` });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: `Пользователь по указанному _id: ${req.params.userId} не найден.` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(createdStatus).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequestStatus).send({ message: err.message });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.status(okStatus).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequestStatus).send({ message: err.message });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: 'Пользователь по указанному _id не найден.' });
      } else if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id: ${req.params.userId}` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.editUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: 'true', runValidators: true })
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequestStatus).send({ message: err.message });
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: 'Пользователь по указанному _id не найден.' });
      } else if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id: ${req.params.userId}` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
