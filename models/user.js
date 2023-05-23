const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },

    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      default: 'https://avatars.dzeninfra.ru/get-zen_doc/230574/pub_5c5fcd9b8e5f1300ac3d0c72_5c5fcda1265ca800ac0f55d6/scale_2400',
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неверный email',
      },
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
  },

  // удаляем версию внутри объекта:
  // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
  {
    versionKey: false,
  },
);

// eslint жалуется на безымянную функцию, использую function _(), решение с https://stackoverflow.com/questions/52735032/warning-unexpected-unnamed-function-func-names-under-eslint-rule
UserSchema.statics.findUserByCredentials = function _(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', UserSchema);
