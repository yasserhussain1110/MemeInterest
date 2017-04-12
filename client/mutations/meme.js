import _ from 'lodash';

const updateLike = (memes, memeIndex, changeLikeCountBy, iLiked) => {
  if (iLiked === undefined) {
    iLiked = memes[memeIndex].iLiked;
  }

  return [
    ...memes.slice(0, memeIndex),
    Object.assign({}, memes[memeIndex], {
        iLiked,
        totalLikes: memes[memeIndex].totalLikes + changeLikeCountBy
      }
    ),
    ...memes.slice(memeIndex + 1)
  ];
};

export default {
  gotAllMemes(state, allMemes) {
    state.allMemes = allMemes;
  },

  buildMyMemeIndices(state) {
    state.myMemeIndices =
      _.range(state.allMemes.length).filter(mimeIndex => state.allMemes[mimeIndex]._addedBy._id === state.me._id);
  },

  addedMeme(state, meme) {
    state.allMemes = state.allMemes.concat(meme);
    state.myMemeIndices = state.myMemeIndices.concat(state.allMemes.length - 1);
  },

  buildUserMemeIndices(state, userId) {
    state.userMemeIndices =
      _.range(state.allMemes.length).filter(mimeIndex => state.allMemes[mimeIndex]._addedBy._id === userId);
  },

  likedMeme(state, memeIndex) {
    state.allMemes = updateLike(state.allMemes, memeIndex, 1, true);
  },

  unlikedMeme(state, memeIndex) {
    state.allMemes = updateLike(state.allMemes, memeIndex, -1, false);
  },

  removedMeme(state, memeIndex) {
    state.allMemes = [
      ...state.allMemes.slice(0, memeIndex),
      ...state.allMemes.slice(memeIndex + 1)
    ];
  },

  removedMemeById(state, memeId) {
    state.allMemes = state.allMemes.filter(meme => meme._id !== memeId);
  },

  likedMemeById(state, memeId) {
    let index = state.allMemes.findIndex(meme => meme._id === memeId);
    state.allMemes = updateLike(state.allMemes, index, 1);
  },

  unlikedMemeById(state, memeId) {
    let index = state.allMemes.findIndex(meme => meme._id === memeId);
    state.allMemes = updateLike(state.allMemes, index, -1);
  }
};
