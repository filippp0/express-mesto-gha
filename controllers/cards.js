const mongoose = require('mongoose');
const Card = require('../models/card');
const {
  badRequestStatus, notFoundStatus, serverErrorStatus, createdStatus, okStatus,
} = require('../utils/constants');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(createdStatus).send(data))
        .catch((err) => {
          if (err instanceof mongoose.Error.DocumentNotFoundError) {
            res.status(notFoundStatus).send({ message: 'Карточка с указанным _id не найдена.' });
          } else {
            res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
          }
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(badRequestStatus).send({ message: err.message });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(okStatus).send(cards))
    .catch(() => res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => {
      res.status(okStatus).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: `Карточка с _id: ${req.params.cardId} не найдена.` });
      } else if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id карточки: ${req.params.cardId}` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(okStatus).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: `Карточка с _id: ${req.params.cardId} не найдена.` });
      } else if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id карточки: ${req.params.cardId}` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail()
    .populate(['owner', 'likes'])
    .then((card) => {
      res.status(okStatus).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        res.status(notFoundStatus).send({ message: `Карточка с _id: ${req.params.cardId} не найдена.` });
      } else if (err instanceof mongoose.Error.CastError) {
        res.status(badRequestStatus).send({ message: `Некорректный _id карточки: ${req.params.cardId}` });
      } else {
        res.status(serverErrorStatus).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
