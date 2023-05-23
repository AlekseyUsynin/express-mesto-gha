const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require('../errors/constants');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'fire', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports.getUsers = (req, res) => {
  UserSchema.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' }));
};

module.exports.getUser = (req, res) => {
  UserSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы неверные данные.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' });
      }
    });
};

module.exports.getUserId = (req, res) => {
  const { userId } = req.params;
  UserSchema.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Не указано ID пользователя.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы неверные данные.' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, email, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      UserSchema.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.send({ data: user });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            res.status(BAD_REQUEST).send({
              message: 'Переданы некорректные данные при создании пользователя',
            });
          } else {
            res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' });
          }
        });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message:
            'Переданы некорректные данные при редактировании пользователя.',
        });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        return res
          .status(NOT_FOUND)
          .send({ message: 'Пользователь не найден.' });
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({
          message:
            'Переданы некорректные данные при редактировании пользователя.',
        });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Ошибка сервера!' });
      }
    });
};
