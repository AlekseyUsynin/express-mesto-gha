const router = require("express").Router();

const { getUsers, getUserId, createUser, updateUser, updateAvatar } = require("../controllers/users");
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards");

router.get("/users", getUsers);
router.get("/users/:userId", getUserId);
router.post("/users", createUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateAvatar);

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);
router.put("/cards/:cardId/likes", likeCard);
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
