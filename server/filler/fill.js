require('../config/config');
const mongoose = require('../db/mongoose');
const {ObjectId} = require('mongodb');
const User = require('../models/user');
const Meme = require('../models/meme');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();
const userThreeId = new ObjectId();
const userFourId = new ObjectId();

const users = [
  {
    _id: userOneId,
    twitterId: 'awesomeTwitterId1',
    username: 'awesomeuserone',
    displayName: 'Awesome User1',
    photos: [{
      value: "http://www.userone1.photo.jpg"
    }]
  },
  {
    _id: userTwoId,
    twitterId: 'awesomeTwitterId2',
    username: 'awesomeusertwo',
    displayName: 'Awesome User2',
    photos: [{
      value: "http://www.userone2.photo.jpg"
    }]
  },
  {
    _id: userThreeId,
    twitterId: 'awesomeTwitterId3',
    username: 'thirduserhere',
    displayName: 'Awesome User3',
    photos: [{
      value: "http://www.userone3.photo.jpg"
    }]
  },
  {
    _id: userFourId,
    twitterId: 'awesomeTwitterId4',
    username: 'usernumberfour',
    displayName: 'Awesome User4',
    photos: [{
      value: "http://www.userone4.photo.jpg"
    }]
  }
];


const memes = [
  {
    url: 'http://meme.rank1.awesome.com/meme.jpg',
    description: 'Meme Ranked One1',
    addedBy: userOneId,
    likes: [
      {
        likedBy: userOneId
      },
      {
        likedBy: userTwoId
      },
      {
        likedBy: userThreeId
      },
      {
        likedBy: userFourId
      }
    ]
  },
  {
    url: 'http://second.meme.gotcha/great.jpg',
    description: 'Meme Two',
    addedBy: userOneId,
    likes: [
      {
        likedBy: userTwoId
      },
      {
        likedBy: userThreeId
      },
      {
        likedBy: userFourId
      }
    ]
  }
];

User.remove({}).then(() => {
  return User.insertMany(users);
}).then(() => {
  return Meme.remove({});
}).then(() => {
  return Meme.insertMany(memes);
}).then(() => {
  mongoose.connection.close();
});
