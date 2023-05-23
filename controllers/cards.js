const CardSchema = require('../models/card');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.getCards = (req, res, next) => {
  CardSchema.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  CardSchema.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  CardSchema.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с таким id не найдена.');
      }
      if (!card.owner.equals(req.user._id)) {
        return next(new Forbidden('Нельзя удалить карточку другого пользователя!'));
      }
      return card
        .deleteOne()
        // .then(() => res.status(403).send({ message: 'Карточка удалена' }));
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => CardSchema.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      throw new NotFound('Карточка с таким id не найдена.');
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неверные данные.'));
    } else {
      next(err);
    }
  });

module.exports.dislikeCard = (req, res, next) => CardSchema.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)

  .then((card) => {
    if (!card) {
      throw new NotFound('арточка с таким id не найдена.');
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы неверные данные.'));
    } else {
      next(err);
    }
  });
