const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    link: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },

    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      default: [],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  // удаляем версию внутри объекта:
  // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
