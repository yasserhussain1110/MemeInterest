require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 15 * 24 * 60 * 60 * 1000  /* equivalent to 15 days */
  },
  store: new LokiStore({
    autosave: false
  })
}));

app.use(bodyParser.json());

require('./routes/user')(app);
require('./routes/meme')(app);

/* Set up development server if required */
if (process.env.NODE_ENV === "development") {
  console.log("Running In Development");
  require('./tools/setupDev')(app);
}
/* Or serve static assets in production */
else if (process.env.NODE_ENV === "production") {
  console.log("Running In Production");
  app.use(express.static('./dist'));
}

const http = require('http').Server(app);
const io = require('socket.io')(http);

global.io = io;

http.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;

