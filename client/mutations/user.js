export default {
  loggedIn(state) {
    state.isLoggedIn = true;
  },

  loggedOff(state) {
    state.isLoggedIn = false;
    state.me = null;
  },

  gotIdentity(state, me) {
    state.me = me;
  }
};
