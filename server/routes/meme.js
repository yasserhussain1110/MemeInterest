const Meme = require('../models/meme');
const auth = require('../middleware/auth');
const {getFullPlaceholderImageUrl} = require('../helper/lib');
const imageType = require('image-type');
const hh = require('http-https');

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

  const insertNewMemeAndSendResponse = (memeInfo, userId, res) => {
    Meme.insertNew(memeInfo, userId).then(meme => {
      res.status(201).send(meme);
      io.emit('memeAdded', {
        _originator: userId,
        meme
      });
    }).catch(e => {
      res.status(400).send(e);
    });
  };

  const ensureUrlIsReachableAndImage = (url) => {
    return new Promise((resolve, reject) => {
      hh.get(url, response => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          return reject("Status Code is not 200");
        }

        response.once('data', chunk => {
          response.destroy();
          const urlImageType = imageType(chunk);
          console.log(urlImageType);
          if (urlImageType) {
            resolve("Awesome");
          } else {
            reject("Not an image url");
          }
        });
      }).on('error', e => {
        reject("url unreachable");
      });
    });
  };

  app.put('/meme', auth, (req, res) => {
    let user = req.user;

    const memeInfo = req.body;

    if (!memeInfo.url) {
      return res.send(400);
    }

    ensureUrlIsReachableAndImage(memeInfo.url).catch(e => {
      console.log(e);
      memeInfo.url = getFullPlaceholderImageUrl(req);
    }).then(() => {
      insertNewMemeAndSendResponse(memeInfo, user._id, res);
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
