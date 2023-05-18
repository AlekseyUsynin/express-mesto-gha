const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes/router");

const { PORT = 3000 } = process.env;

const app = express();

//static зайдет в папку public, найдет там index.html и запустит его.
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Не раблотает с порта mongodb://localhost:27017, пробую это решение: https://www.mongodb.com/community/forums/t/mongooseserverselectionerror-connect-econnrefused-127-0-0-1-27017/123421/2
mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});

app.use("/", router);

// app.get("/users", (req, res) => {
//   res.send("запрос прощел");
// });

// app.get("/users/:userID", (req, res) => {
//   res.send(req.params.id);
// });

// app.post("/users", (req, res) => {
//   const { name, about } = req.body;
//   res.send(`Имя: ${name}, обо мне: ${about}`);
// });

app.listen(PORT, () => console.log("started!"));
