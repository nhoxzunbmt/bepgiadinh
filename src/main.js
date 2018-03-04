// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueLocalStorage from 'vue-localstorage'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueStar from 'vue-star'
Vue.component('VueStar', VueStar)
// require styles
import 'swiper/dist/css/swiper.css'


// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vuetify/dist/vuetify.min.css' 


Vue.config.productionTip = false

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VueLocalStorage)
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true
})
Vue.use(Vuetify)
Vue.use(VueAwesomeSwiper, /* { default global options } */)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
