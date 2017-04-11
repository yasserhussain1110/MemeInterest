export const getIdentity = _this => {
  return _this.$http.get('/identity').then(res => {
    _this.$store.commit('loggedIn');
    _this.$store.commit('gotUser', res.body);
  }).catch(e => {
    _this.$store.commit('loggedOff');
    return e;
  });
};

export const getMyMemes = _this => {
  _this.$store.commit('buildMyMemesIndex');
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
    console.log(e);
  });
};
