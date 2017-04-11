const Meme = require('../models/meme');
const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/meme', (req, res) => {
    let userId = null;
    if (req.user) {
      userId = req.user._id;
    }

    Meme.findAllMemes()
      .then(memes => {
        return memes.map(meme => {
          return meme.formatForUser(userId);
        });
      })
      .then(modMemes => {
        res.send(modMemes);
      })
      .catch(e => {
        console.log(e);
        res.status(400).send(e);
      });
  });

  /*
  app.get('/meme/user/:id', (req, res) => {
    let requesterUserId = null;
    if (req.user) {
      requesterUserId = req.user._id;
    }

    let targetUserId = req.params.id;

    Meme.find({_addedBy: targetUserId}).then(memes => {
      const modMemes = memes.map(meme => {
        return meme.formatForUser(requesterUserId);
      });
      res.send(modMemes);
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });
  */

  app.put('/meme', auth, (req, res) => {
    let user = req.user;

    Meme.insertNew(req.body, user._id).then(meme => {
      res.send(meme);
    }).catch(e => {
      res.status(400).send(e);
    });
  });

  app.delete('/meme/:id', auth, (req, res) => {
    let user = req.user;
    let memeId = req.params.id;


    Meme.findOneAndRemove({
      _id: memeId,
      _addedBy: user._id
    }).then(meme => {
      console.log(meme);
      res.status(200).send();
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });
};
