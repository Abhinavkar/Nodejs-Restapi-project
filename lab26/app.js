const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const user = require("./routes/User.route");

app.use("/api", user);
app.get("/", (req, res) => {
  res.json({
    text: "success",
  });
});

module.exports = app;
