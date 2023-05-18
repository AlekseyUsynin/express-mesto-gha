const router = require("express").Router();

const { getUsers, getUserId, createUser } = require("../controllers/users");
const { getCards, createCard, deleteCard } = require("../controllers/cards");

router.get("/users", getUsers);
router.get("/users/:userId", getUserId);
router.post("/users", createUser);

router.get("/cards", getCards);
router.post("/cards", createCard);
router.delete("/cards/:cardId", deleteCard);


module.exports = router;
