const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");


const { PORT = 3000 } = process.env;

const app = express();

//static зайдет в папку public, найдет там index.html и запустит его.
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Не раблотает с порта mongodb://localhost:27017
// решение: https://www.mongodb.com/community/forums/t/mongooseserverselectionerror-connect-econnrefused-127-0-0-1-27017/123421/2
mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '6465bcdc3c6630efca837c2a' // _id пользователя
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);


app.listen(PORT, () => console.log("started!"));
