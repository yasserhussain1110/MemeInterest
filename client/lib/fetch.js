export const getIdentity = _this => {
  return _this.$http.get('/identity').then(res => {
    _this.$store.commit('loggedIn');
    _this.$store.commit('gotIdentity', res.body);
  }).catch(e => {
    _this.$store.commit('loggedOff');
    return e;
  });
};

export const buildMyMemes = _this => {
  _this.$store.commit('buildMyMemeIndices');
};

export const getAllMemes = _this => {
  return _this.$http.get('/meme').then(res => {
    _this.$store.commit('gotAllMemes', res.body);
  }).catch(e => {
    console.log(e);
  });
};

export const addMeme = (_this, memeObj) => {
  _this.$http.put('/meme', memeObj).then(res => {
    _this.$store.commit('addedMeme', res.body);
  }).catch(e => {
    _this.$store.commit('loggedOff');
    console.log(e);
  });
};

export const likeMeme = (_this, meme, memeIndex) => {
  _this.$http.post(`/meme/${meme._id}/like`).then(res => {
    _this.$store.commit('likedMeme', memeIndex);
  }).catch(e => {
    _this.$store.commit('loggedOff');
    console.log(e);
  });
};

export const unlikeMeme = (_this, meme, memeIndex) => {
  _this.$http.post(`/meme/${meme._id}/unlike`).then(res => {
    _this.$store.commit('unlikedMeme', memeIndex);
  }).catch(e => {
    _this.$store.commit('loggedOff');
    console.log(e);
  });
};

export const removeMeme = (_this, meme, memeIndex) => {
  _this.$http.delete(`/meme/${meme._id}`).then(res => {
    _this.$store.commit('removedMeme', memeIndex);
    _this.$store.commit('buildMyMemeIndices');
  }).catch(e => {
    _this.$store.commit('loggedOff');
    console.log(e);
  });
};
