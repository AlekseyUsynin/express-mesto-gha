const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const urlJoi = (url) => {
  if (validator.isURL(url)) return url;
  throw new BadRequest('Не верный URL');
};

module.exports.loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    avatar: Joi.string().custom(urlJoi),
    password: Joi.string().required(),
  }),
});
