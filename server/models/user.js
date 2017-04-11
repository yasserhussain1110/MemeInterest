const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  twitterId: {
    type: String,
    trim: true,
    required: true
  },
  username: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  displayName: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  photos: [{
    value: {
      type: String,
      trim: true,
      minlength: 5,
      validate: {
        validator: url => validator.isURL(url),
        message: '{VALUE} is not a valid URL'
      },
      required: true
    }
  }]
});

UserSchema.statics.findOrCreate = function (userInfo) {
  userInfo.twitterId = userInfo.id;

  const usableUserInfo = _.pick(userInfo, ['twitterId', 'username', 'displayName', 'photos']);

  const User = this;

  return User.findOne({
    twitterId: usableUserInfo.twitterId
  }).then(user => {
    if (!user) {
      throw new Error("Not Found");
    }
    return user;
  }).catch(() => {
    const user = new User(usableUserInfo);
    return user.save();
  });
};

UserSchema.methods.toJSON = function () {
  const user = this;
  return _.pick(user, ["_id", "twitterId", "username", "displayName", "photos"]);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
