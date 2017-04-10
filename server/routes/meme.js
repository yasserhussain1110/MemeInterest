const Meme = require('../models/meme');

module.exports = app => {
  app.get('/meme', (req, res) => {
    Meme.find().then(memes => {
      const modMemes = memes.map(meme => {
        return meme.formatForUser(null);
      });
      res.send(modMemes);
    });
  });
};
