import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedIn: false,
    me: null,
    allMemes: [],
    myMemeIndices: [],
    userMemeIndices: []
  },
  mutations
});


Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */

import 'font-awesome/css/font-awesome.css';

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: {App}
});
