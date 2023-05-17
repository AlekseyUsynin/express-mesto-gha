const userSchema = require("../models/user");

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(err);
};

module.exports.getUserId = (req, res) => {
  userSchema
    .findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(err);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  userSchema
    .create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.send({
          message: "Переданы не верные данные пользователя",
        });
      }

      return res.send({ message: "Произошла ошибка" });
    });
};
