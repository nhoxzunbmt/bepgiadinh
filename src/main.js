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

// import { register } from 'register-service-worker'

// register('/service-worker.js', {
//   ready () {
//     console.log('Service worker is active.')
//   },
//   cached () {
//     console.log('Content has been cached for offline use.')
//   },
//   updated () {
//     console.log('New content is available; please refresh.')
//   },
//   offline () {
//     console.log('No internet connection found. App is running in offline mode.')
//   },
//   error (error) {
//     console.error('Error during service worker registration:', error)
//   }
// })
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
