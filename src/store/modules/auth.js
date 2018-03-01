import axios from 'axios'
import Vue from 'vue'

import { LOGIN, LOGIN_SUCCESSS, USER_CURRENT } from '../mutation-types';



const API_BASE = process.env.API_URL;

const state = {
    module: 'user',
    user: null,
}

const actions = {
    login: ({ commit }, id) => {
        commit(LOGIN)

        const wp_username = 'thanhloi@ringier.com.vn'
        const wp_password = '530825'

        const payload = {
                username: wp_username,
                password: wp_password
        }

        axios.post(`${API_BASE}jwt-auth/v1/token`, payload).then(response => {
            commit(LOGIN_SUCCESSS, response.data)
        })
    },
    logout: ({ commit }, payload) => {
        commit(COMMENTS_BY_POST);
        axios.get(`${API_BASE}wp/v2/comments?post=${payload.post_id}`).then(response => {
            console.log('getComments', response.data);
            commit(COMMENTS_BY_POST_SUCCESSS, response.data)
        })
    },
    getCurrentUser:({ commit }) => {
        commit(USER_CURRENT)
    },
    getUserById: ({ commit }, page) => {
        axios.get(`${API_BASE}wp/v2/posts?order=desc&page=${page}`).then(response => {

            commit('LOAD_MORE_COMMENTS', response.data)
        })
    }
};

const mutations = {
    LOGIN(state) {
        state.isLoading = true
    },
    LOGIN_SUCCESSS(state,payload) {
        state.isLoading = false
        state.user = payload
        Vue.localStorage.set('user',payload)
    },
    USER_CURRENT(state){
        if(Vue.localStorage.get('user')){
            state.user = Vue.localStorage.get('user')
        }
        console.log(state.user)
    }
}

const getters = {
    user: (state) => {
        
        return state.user
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}

