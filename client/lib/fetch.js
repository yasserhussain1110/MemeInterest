export const getIdentity = _this => {
  _this.$http.get('/identity').then(res => {
    console.log(res.body);
    _this.$store.commit('loggedIn');
    _this.$store.commit('gotUser', res.body);
  }).catch(() => {
    _this.$store.commit('loggedOff');
  });
};
