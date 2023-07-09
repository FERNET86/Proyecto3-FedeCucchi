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
import router from "./router";
import ProductList from './components/ProductList.vue';
import store from '../store/index';


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueAxios, Axios);
Vue.use(vueForm);
Vue.component('ProductList', ProductList);


new Vue({
  store,  
  router,
  render: h => h(App),
}).$mount('#app');
