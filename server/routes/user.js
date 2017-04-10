const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const User = require('../models/user');

passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: `http://localhost:${process.env.PORT}/login/twitter/return`
  },
  function (token, tokenSecret, profile, cb) {
    User.findOrCreate(profile)
      .then(user => {
        return cb(null, user);
      });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id).then(user => {
    done(null, user);
  }).catch(err => {
    done(err, null);
  });
});

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login',
    passport.authenticate('twitter'));

  app.get('/login/twitter/return',
    passport.authenticate('twitter', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    });
};
