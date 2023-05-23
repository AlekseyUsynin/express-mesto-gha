const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardRoutes = require('./routes/cards');
const userRoutes = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Не раблотает с порта mongodb://localhost:27017
// решение: https://www.mongodb.com/community/forums/t/mongooseserverselectionerror-connect-econnrefused-127-0-0-1-27017/123421/2
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use(userRoutes);
app.use(cardRoutes);

app.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

module.exports = (err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({
    message: status === 500 ? 'Ошибка сервера!' : message,
  });
  next();
};

app.listen(PORT);
