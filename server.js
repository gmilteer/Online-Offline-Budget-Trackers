const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://gmilteer:Myrtleamy12@cluster0.gpnge.mongodb.net/<dbname>?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    app.listen(PORT);
    console.log("http://localhost:" + PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// routes
app.use(require("./routes/api.js"));
