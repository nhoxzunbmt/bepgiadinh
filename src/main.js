// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './AppWeb'
import router from './router'
import store from './store/store'
import VueLocalStorage from 'vue-localstorage'
import BootstrapVue from 'bootstrap-vue'
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import VueStar from 'vue-star'
// import VueAnalytics from 'vue-analytics'
// import VueAuth from 'vue-auth'
Vue.component('VueStar', VueStar)
// require styles
import 'swiper/dist/css/swiper.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

// import './assets/css/plugin.css' 
import './assets/css/main.css'


// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import 'vuetify/dist/vuetify.min.css' 

// import { register } from 'register-service-worker'

// register('/static/service-worker.js', {
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
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  facebookOauth2Data: {
    clientId: '229452330876668'
  },
  googleOauth2Data: {
    clientId: '547886745924-4vrbhl09fr3t771drtupacct6f788566.apps.googleusercontent.com'
  }
})

// Vue.use(VueAnalytics, {
//   id: 'Ua-1234-5',
//   router,
//   autoTracking: {
//     exception: true
//   },
//   debug:{
//     enabled: !isProd,
//     sendHitTask: isProd
//   }
// })

import ability from './config/ability'
import abilitiesPlugin from './config/ability-plugin'


Vue.use(abilitiesPlugin, ability)
window.ability = ability


// import VueChatScroll from 'vue-chat-scroll'
// Vue.use(VueChatScroll)

// https://github.com/hilongjw/vue-lazyload
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload)


// import Overdrive from 'vue-overdrive'
// Vue.use(Overdrive)


// import Transitions from 'vue2-transitions'
// Vue.use(Transitions)



//https://github.com/egoist/vue-timeago
import VueTimeago from 'vue-timeago'
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})



//https://github.com/michalsnik/vue-content-placeholders
// import VueContentPlaceholders from 'vue-content-placeholders'
// Vue.use(VueContentPlaceholders)



//https://github.com/nicolasbeauvais/vue-social-sharing
// import SocialSharing  from 'vue-social-sharing';
// Vue.use(SocialSharing)


// import infiniteScroll from 'vue-infinite-scroll'
// Vue.use(infiniteScroll)

// import Firebase from 'firebase'
// import VueFire from 'vuefire'




// Vue.use(VueFire)



//http://izitoast.marcelodolce.com/
// import Izitoast from 'izitoast'
// Vue.use(Izitoast)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
