import _ from 'lodash';

export default {
  gotAllMemes(state, allMemes) {
    state.allMemes = allMemes;
  },

  buildMyMemesIndex(state) {
    state.myMemeIndices =
      _.range(state.allMemes.length).filter(mimeIndex => state.allMemes[mimeIndex]._addedBy._id === state.user._id);
  },

  addedMeme(state, meme) {
    state.allMemes = state.allMemes.concat(meme);
    state.myMemeIndices = state.myMemeIndices.concat(state.allMemes.length - 1);
  }
};
