import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';
import VueSession from 'vue-session';

Vue.use(VueSession);
Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
