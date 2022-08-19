const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/anti-social-social-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;