const userSchema = require("../models/user");

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(err);
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(err);
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(err);
};
