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
import VueAnalytics from 'vue-analytics'
import VueAuth from 'vue-auth'
Vue.component('VueStar', VueStar)
// require styles
import 'swiper/dist/css/swiper.css'

import axios from 'axios'
import VueAxios from 'vue-axios'


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
Vue.use(VueAxios, axios)

const isProd = process.env.NODE_ENV === 'production'
Vue.axios.defaults.baseURL = 'https://api-demo.websanova.com/api/v1';

Vue.router = router


Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js')
})

Vue.use(VueAnalytics, {
  id: 'Ua-1234-5',
  router,
  autoTracking: {
    exception: true
  },
  debug:{
    enabled: !isProd,
    sendHitTask: isProd
  }
})

import ability from './config/ability'
import abilitiesPlugin from './config/ability-plugin'
 

Vue.use(abilitiesPlugin, ability)
window.ability = ability

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
