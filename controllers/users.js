const UserSchema = require("../models/user");

module.exports.getUsers = (req, res) => {
  UserSchema
    .find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({message: 'Ошибка сервера!'}));
};

module.exports.getUserId = (req, res) => {
  UserSchema
    .findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(err);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserSchema
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.send({
          message: "Переданы не верные данные пользователя",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};
