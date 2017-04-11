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
  likes: [Schema.Types.ObjectId]
});

MemeSchema.statics.insertNew = function (memeInfo, userId) {
  const meme = new Meme(Object.assign({}, _.pick(memeInfo, ["url", "description"]), {addedBy: userId}));
  return meme.save();
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
  return _.pick(meme, ['url', 'description', 'addedBy', 'likes']);
};

const Meme = mongoose.model('Meme', MemeSchema);

module.exports = Meme;
