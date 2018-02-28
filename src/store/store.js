import Vue from 'vue'
import Vuex from 'vuex'



import post from './modules/post'
import category from './modules/category'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isShowNavbar: true
    },
    getters: {
      isShowNavbar: (state, getters) => {
        return state.isShowNavbar
      }
    },
    actions: {
        hideNavbar: ({ commit }) => {
            commit('NAVBAR', false)
       }
    },
    mutations: {
        ['NAVBAR'](state , action){
            state.isShowNavbar = action
        },
    },
    modules: {
        mdpost:post,
        mdcategory:category
    }
})
