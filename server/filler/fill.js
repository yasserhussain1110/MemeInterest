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
    url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRspb2i8Xsbho7dIx_JIG88Quz2oXovkT47wcEb4-DyErvuYJlMsQ',
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
    url: 'https://www.google.co.in/imgres?imgurl=https%3A%2F%2Ffthmb.tqn.com%2FQt1YuEXTl3Tmu8xz_ovq5BAf2xQ%3D%2F735x0%2Fabout%2Fsuccess-56a9fd1f3df78cf772abee09.jpg&imgrefurl=https%3A%2F%2Fwww.lifewire.com%2Fwhat-is-a-meme-2483702&docid=mXRzIvpyC1kafM&tbnid=gZLGDFnF3XPCKM%3A&vet=10ahUKEwiJ7IfF55vTAhWKK48KHdKAA3cQMwhbKCEwIQ..i&w=735&h=735&bih=678&biw=1311&q=memes&ved=0ahUKEwiJ7IfF55vTAhWKK48KHdKAA3cQMwhbKCEwIQ&iact=mrc&uact=8',
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
