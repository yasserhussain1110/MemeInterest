const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');

const Schema = mongoose.Schema;

const MemeSchema = new Schema({
  url: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: url => validator.isURL(url),
      message: '{VALUE} is not a valid URL'
    }
  },
  description: {
    type: String,
    trim: true,
    minlength: 5
  },
  _addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  likes: [Schema.Types.ObjectId]
});

MemeSchema.statics.insertNew = function (memeInfo, userId) {
  const Meme = this;
  const meme = new Meme(Object.assign({}, _.pick(memeInfo, ["url", "description"]), {_addedBy: userId}));
  meme.save();
  return Meme.populate(meme, {path: "_addedBy"}).then(meme => meme.formatForUser());
};

MemeSchema.statics.findAllMemes = function () {
  const Meme = this;
  return Meme.find().populate('_addedBy');
};

MemeSchema.statics.like = function (memeId, userId) {
  const Meme = this;
  return Meme.update({
    _id: memeId
  }, {
    likes: {
      $push: userId
    }
  });
};

MemeSchema.methods.formatForUser = function (userId) {
  const meme = this.toJSON();
  meme.iLiked = userId in meme.likes;
  meme.totalLikes = meme.likes.length;
  delete meme.likes;
  return meme;
};

MemeSchema.methods.toJSON = function () {
  const meme = this;
  return _.pick(meme, ['_id', 'url', 'description', '_addedBy', 'likes']);
};

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;
