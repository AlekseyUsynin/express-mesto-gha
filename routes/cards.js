const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const { cardJoi } = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', cardJoi, deleteCard);
router.put('/cards/:cardId/likes', cardJoi, likeCard);
router.delete('/cards/:cardId/likes', cardJoi, dislikeCard);

module.exports = router;
