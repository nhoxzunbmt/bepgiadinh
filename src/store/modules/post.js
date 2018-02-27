import axios from 'axios'
import Vue from 'vue'

const API_BASE = process.env.API_URL;

const state = {
  module: 'post',
  posts: [],
  post: [],
  page: 1
}



const actions = {
  getPost: ({ commit }, id) => {
    axios.get(`${API_BASE}wp/v2/posts/${id}`).then(response => {
      console.log(response.data)
      commit('GET_POST', response.data)
    })
  },
  getPosts: ({ commit }, payload) => {
    

    axios.get(`${API_BASE}wp/v2/posts?order=desc`).then(response => {
      console.log(response.data)
      commit('GET_POSTS', response.data)
    })
  },
  loadMore: ({ commit }, page) => {
    axios.get(`${API_BASE}wp/v2/posts?order=desc&page=${page}`).then(response => {
      console.log(response.data)
      commit('LOAD_MORE', response.data)
    })
  },
  searchPost:({ commit }, keyword) => {
    axios.get(`${API_BASE}wp/v2/posts?order=desc&search=${keyword}`).then(response => {
      console.log(response.data)
      commit('GET_POSTS', response.data)
    })
  },
};

const mutations = {
  'GET_POST'(state, post) {
    state.post = post
  },
  'GET_POSTS'(state, posts) {
    Vue.localStorage.set('getPosts', posts)
    state.posts = posts
  },
  'LOAD_MORE'(state, posts) {
    state.posts = posts
    state.page += 1
  }
}

const getters = {
  post: (state) => {
    return state.post
   },
  posts: (state) => {
   return state.posts
  },
  page:(state) => {
    return state.page
   }
}

export default {
  state,
  mutations,
  actions,
  getters
}

