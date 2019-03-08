import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
import {
  Carousel,
  CarouselItem,
  Dialog,
  Form,
  FormItem,
  Button,
  Input,
  Alert,
  Message
 } from 'element-ui';
Vue.use(Alert); 
Vue.use(Carousel); 
Vue.use(CarouselItem); 
Vue.use(Dialog); 
Vue.use(Form); 
Vue.use(FormItem); 
Vue.use(Button); 
Vue.use(Input); 
Vue.prototype.$message = Message;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
