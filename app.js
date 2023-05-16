const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.get('/users', (req, res) => {
  if (!users[req.params.id]) {
    res.send({ error: 'Такого пользователя нет' });
    return;
  }
  res.send(users)
});

app.get('/users/:userID', (req, res) => {
  res.send(req.params.id)
});

app.post('/users', (req, res) => {
  const { name, about } = req.body;
  res.send(`Имя: ${name}, обо мне: ${about}`);
});

app.listen(PORT);
