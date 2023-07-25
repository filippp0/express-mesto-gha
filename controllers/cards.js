const Card = require('../models/card');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.send(data))
        .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  if (req.params.cardId) {
    Card.findByIdAndRemove(req.params.cardId)
      .then(() => res.send({ message: 'Карточка удалена' }))
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(500).send({ message: 'Ошибка по умолчанию.' });
  }
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => res.send(card))
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(500).send({ message: 'Ошибка по умолчанию.' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .populate(['owner', 'likes'])
      .then((card) => res.send(card))
      .catch(() => res.status(404).send({ message: 'Карточка с указанным _id не найдена.' }));
  } else {
    res.status(500).send({ message: 'Ошибка по умолчанию.' });
  }
};
