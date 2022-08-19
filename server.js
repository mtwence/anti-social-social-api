const express = require("express");
const db = require("./config/connection");
const mongoose = require('mongoose');
mongoose.set('debug', true);
const routes = require("./routes");
const PORT = process.env.PORT || 3003;
const app = express();

app.use(routes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
  });
});