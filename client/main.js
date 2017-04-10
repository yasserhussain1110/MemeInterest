import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
import Vuex from 'vuex';

Vue.use(Vuex);

Vue.config.productionTip = false;
Vue.use(VueResource);

/* eslint-disable no-new */

import 'font-awesome/css/font-awesome.css';

new Vue({
  el: '#app',

  template: '<App/>',
  components: {App}
});
