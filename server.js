const express = require("express");
const core = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(core());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "WELCOME TO THE APPLICATION" });
});
