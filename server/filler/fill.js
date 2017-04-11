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
      value: "https://pbs.twimg.com/profile_images/835813217200979970/Hj99HBZT_normal.jpg"
    }]
  },
  {
    _id: userTwoId,
    twitterId: 'awesomeTwitterId2',
    username: 'awesomeusertwo',
    displayName: 'Awesome User2',
    photos: [{
      value: "https://pbs.twimg.com/profile_images/818683725214953473/cZBKmGRj_normal.jpg"
    }]
  },
  {
    _id: userThreeId,
    twitterId: 'awesomeTwitterId3',
    username: 'thirduserhere',
    displayName: 'Awesome User3',
    photos: [{
      value: "https://pbs.twimg.com/profile_images/670879941970362368/NNEapuL3_normal.jpg"
    }]
  },
  {
    _id: userFourId,
    twitterId: 'awesomeTwitterId4',
    username: 'usernumberfour',
    displayName: 'Awesome User4',
    photos: [{
      value: "https://pbs.twimg.com/profile_images/795497151732350976/bsmOcevI_normal.jpg"
    }]
  }
];


const memes = [
  {
    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRspb2i8Xsbho7dIx_JIG88Quz2oXovkT47wcEb4-DyErvuYJlMsQ',
    description: 'Meme Ranked One1',
    _addedBy: userOneId,
    likes: [userOneId, userTwoId, userThreeId, userFourId]
  },
  {
    url: 'https://fthmb.tqn.com/Qt1YuEXTl3Tmu8xz_ovq5BAf2xQ=/735x0/about/success-56a9fd1f3df78cf772abee09.jpg',
    description: 'Meme Two',
    _addedBy: userOneId,
    likes: [userTwoId, userThreeId, userFourId]
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
