import Vue from 'vue'
import Vuex from 'vuex'
import { analyticsMiddleware } from 'vue-analytics'


import post from './modules/post'
import category from './modules/category'
import comment from './modules/comment';
import auth from './modules/auth';
import analytics from './modules/analytics'
 
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isShowNavbar: true,
        page: 1
    },
    getters: {
        isShowNavbar: (state, getters) => {
            return state.isShowNavbar
        },
        page: (state) => {
            return state.page
        },
        isLoading: (state) => {
            return state.isLoading
        }
    },
    actions: {
        hideNavbar: ({ commit }, status) => {
            status = status == false ? true : false;
            commit('NAVBAR', status)
        }
    },
    mutations: {
        ['NAVBAR'](state, action) {
            state.isShowNavbar = action
        },
    },
    modules: {
        mdpost: post,
        mdcategory: category,
        mdcomment: comment,
        mdauth: auth,
        mdanalytics: analytics
    },
    plugins: [
        analyticsMiddleware
      ]
})
