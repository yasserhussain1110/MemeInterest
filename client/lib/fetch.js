export const getIdentity = _this => {
  _this.$http.get('/identity').then(res => {
    console.log(res.body);
    _this.$store.commit('loggedIn');
    _this.$store.commit('gotUser', res.body);
  }).catch(() => {
    _this.$store.commit('loggedOff');
  });
};

export const addMeme = (_this, memeObj) => {
  _this.$http.put('/meme', memeObj).then(res => {
    console.log(res.body);
    //_this.$store.commit('addedMeme', res.body);
  }).catch(e => {
    console.log(e);
  });
};
