const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/Budget-Tracker";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

// routes
app.use(require("./routes/api.js"));

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://gmilteer:Myrtleamy12@cluster0.gpnge.mongodb.net/Budget-Tracker?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
