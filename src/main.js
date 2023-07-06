import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import vueForm from 'vue-form';
import RegisterForm from './components/Register.vue';
import LoginForm from './components/Login.vue';
import router from "./router";
import ProductList from './components/ProductList.vue';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, Axios);
Vue.use(vueForm);
Vue.component('RegisterForm', RegisterForm);
Vue.component('LoginForm', LoginForm);
Vue.component('ProductList', ProductList);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
