const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/anti-social-social-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
