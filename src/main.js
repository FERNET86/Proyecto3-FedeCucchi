import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueAxios from 'vue-axios';
import Axios from 'axios';

import RegisterForm from './components/Register.vue';
import LoginForm from './components/Login.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, Axios);

Vue.component('RegisterForm', RegisterForm);
Vue.component('LoginForm', LoginForm);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

new Vue({
  render: h => h(App),
}).$mount('#app');
