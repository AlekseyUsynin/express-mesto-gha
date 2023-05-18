const CardSchema = require("../models/card");

module.exports.getCards = (req, res) => {
  CardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch((err) => res.status(400).send({message: 'Ошибка сервера!'}));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  CardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => {res.send({ data: card })})
    .catch((err) => res.status(400).send({message: 'Ошибка сервера!'}));
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params
  CardSchema.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({message: 'Карточка с таким id не найдена'})
      }
      return card.deleteOne().then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch((err) => res.status(400).send({message: 'Ошибка сервера!'}));
};

module.exports.likeCard = (req, res) => CardSchema.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({message: 'Карточка с таким id не найдена'})
    }
    res.send({ data: card });
  })
  .catch((err) => res.status(400).send({message: 'Ошибка сервера!'}));

module.exports.dislikeCard = (req, res) => CardSchema.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      return res.status(404).send({message: 'Карточка с таким id не найдена'})
    }
    res.send({ data: card });
  })
  .catch((err) => res.status(400).send({message: 'Ошибка сервера!'}));