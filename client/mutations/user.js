export default {
  loggedIn(state) {
    state.isLoggedIn = true;
  },

  loggedOff(state) {
    state.isLoggedIn = false;
  },

  gotIdentity(state, me) {
    state.me = me;
  }
};
