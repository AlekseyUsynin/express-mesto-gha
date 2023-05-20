const UserSchema = require("../models/user");

module.exports.getUsers = (req, res) => {
  UserSchema.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Ошибка сервера!" }));
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  UserSchema.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Не указано ID пользователя" });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы неверные данные." });
      } else {
        res.status(500).send({ message: "Ошибка сервера!" });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  UserSchema.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера!" });
      }
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден." });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res.status(400).send({
          message:
            "Переданы некорректные данные при редактировании пользователя.",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера!" });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Пользователь не найден." });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError" || err.name === "ValidationError") {
        res.status(400).send({
          message:
            "Переданы некорректные данные при редактировании пользователя.",
        });
      } else {
        res.status(500).send({ message: "Ошибка сервера!" });
      }
    });
};
