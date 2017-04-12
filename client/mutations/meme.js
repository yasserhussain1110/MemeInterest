import _ from 'lodash';

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
    state.allMemes = [
      ...state.allMemes.slice(0, memeIndex),
      Object.assign({}, state.allMemes[memeIndex],
        {
          iLiked: true,
          totalLikes: state.allMemes[memeIndex].totalLikes + 1
        }),
      ...state.allMemes.slice(memeIndex + 1)
    ];
  },

  unlikedMeme(state, memeIndex) {
    state.allMemes = [
      ...state.allMemes.slice(0, memeIndex),
      Object.assign({}, state.allMemes[memeIndex],
        {
          iLiked: false,
          totalLikes: state.allMemes[memeIndex].totalLikes - 1
        }),
      ...state.allMemes.slice(memeIndex + 1)
    ];
  },

  removedMeme(state, memeIndex) {
    state.allMemes = [
      ...state.allMemes.slice(0, memeIndex),
      ...state.allMemes.slice(memeIndex + 1)
    ];
  }
};
