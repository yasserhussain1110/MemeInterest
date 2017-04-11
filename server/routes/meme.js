const Meme = require('../models/meme');
const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/meme', (req, res) => {
    let userId = null;
    if (req.user) {
      userId = req.user._id;
    }

    Meme.find().then(memes => {
      const modMemes = memes.map(meme => {
        return meme.formatForUser(userId);
      });
      res.send(modMemes);
    });
  });


  app.put('/meme', auth, (req, res) => {
    let user = req.user;

    Meme.insertNew(req.body, user._id).then(meme => {
      res.send(meme);
    }).catch(e => {
      res.status(400).send(e);
    });
  });
};
