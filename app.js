const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();
var cors = require("cors");
const db = require("./models");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//Models
var models = require("./models");

db.sequelize
  .authenticate()
  .then(() => console.log("connection established"))
  .catch((err) => console.log(err));
//sync database
models.sequelize
  .sync()
  .then(function () {
    console.log("Nice! Database looks fine");
  })
  .catch((err) => {
    console.log(err, "something went wrong");
  });

//require

require("./routes")(app);
app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the beginning of nothingness.",
  })
);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

module.exports = app;
