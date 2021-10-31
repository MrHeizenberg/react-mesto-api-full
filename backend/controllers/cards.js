const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  return Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new CastError('Переданы некорректные данные при создании карточки');
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (card) {
        return Card.findOneAndDelete({ owner: req.user, _id: cardId })
          .then((cardOwner) => {
            if (cardOwner) {
              return res.status(200).send({ message: 'Удалено' });
            }
            throw new ForbiddenError('Вы не можете удалять чужие карточки');
          });
      }
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      next(err);
    })
    .catch(next);
};

const cardLike = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      next(err);
    })
    .catch(next);
};

const cardLikeDelete = (req, res, next) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      throw new NotFoundError('Нет карточки по заданному id');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Задан некорректный id');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, cardLike, cardLikeDelete,
};
