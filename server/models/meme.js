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
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  likes: [{
    likedBy: {
      type: Schema.Types.ObjectId,
      required: true
    }
  }]
});

MemeSchema.methods.formatForUser = function (userId) {
  const meme = this.toJSON();
  meme.iLiked = !!meme.likes.find(like => like.likedBy === userId);
  meme.totalLikes = meme.likes.length;
  delete meme.likes;
  return meme;
};

MemeSchema.methods.toJSON = function () {
  const meme = this;
  return _.pick(meme, ['url', 'description', 'addedBy', 'likes']);
};

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;
