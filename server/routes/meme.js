const Meme = require('../models/meme');
const auth = require('../middleware/auth');
const isImageUrl = require('is-image-url');
const {constructFullUrlFromRequest} = require('../helper/lib');

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

  app.put('/meme', auth, (req, res) => {
    let user = req.user;

    const memeInfo = req.body;

    if (memeInfo.url && !isImageUrl(memeInfo.url)) {
      memeInfo.url = constructFullUrlFromRequest(req);
    }

    Meme.insertNew(req.body, user._id).then(meme => {
      res.status(201).send(meme);
      io.emit('memeAdded', {
        _originator: user._id,
        meme
      });
    }).catch(e => {
      res.status(400).send(e);
    });
  });

  app.post('/meme/:id/like', auth, (req, res) => {
    let user = req.user;
    let memeId = req.params.id;

    Meme.like(memeId, user._id).then(() => {
      res.status(200).send();
      io.emit('memeLiked', {
        _originator: user._id,
        memeId
      });
    }).catch(e => {
      res.status(400).send(e);
    });
  });

  app.post('/meme/:id/unlike', auth, (req, res) => {
    let user = req.user;
    let memeId = req.params.id;

    Meme.unlike(memeId, user._id).then(() => {
      res.status(200).send();
      io.emit('memeUnliked', {
        _originator: user._id,
        memeId
      });
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
      res.status(200).send();
      io.emit('memeRemoved', {
        _originator: user._id,
        memeId
      });
    }).catch(e => {
      console.log(e);
      res.status(400).send(e);
    });
  });
};
