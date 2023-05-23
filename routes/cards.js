const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardIdJoi } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', cardIdJoi, deleteCard);
router.put('/cards/:cardId/likes', cardIdJoi, likeCard);
router.delete('/cards/:cardId/likes', cardIdJoi, dislikeCard);

module.exports = router;
