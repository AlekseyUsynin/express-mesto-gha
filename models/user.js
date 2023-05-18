const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },

    avatar: {
      type: String,
      required: true,
    },
  },

  // удаляем версию внутри объекта:
  // https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("user", UserSchema);
