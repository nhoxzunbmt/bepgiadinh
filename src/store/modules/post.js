import axios from 'axios'
import Vue from 'vue'

const API_BASE = process.env.API_URL;

const state = {
  module: 'post',
  posts: null,
  post: null,
}



const actions = {
  getPost: ({ commit }, id) => {
    state.isLoading = true;
    axios.get(`${API_BASE}wp/v2/posts/${id}`).then(response => {

      commit('GET_POST', response.data)
    })
  },
  getPosts: ({ commit }, payload) => {
    axios.get(`${API_BASE}wp/v2/posts?order=desc`).then(response => {

      commit('GET_POSTS', response.data)
    })
  },
  loadMore: ({ commit }, page) => {
    axios.get(`${API_BASE}wp/v2/posts?order=desc&page=${page}`).then(response => {

      commit('LOAD_MORE', response.data)
    })
  },
  searchPost: ({ commit }, keyword) => {
    axios.get(`${API_BASE}wp/v2/posts?order=desc&search=${keyword}`).then(response => {

      commit('GET_POSTS', response.data)
    })
  },
  lovePost: ({ commit }, post_id) => {
    axios.get(`${API_BASE}wp/v2/posts/${post_id}`).then(response => {
      commit('LOVE_POST', response.data)
    })
  },
};

const mutations = {
  'GET_POST'(state, post) {
    state.post = post
    state.isLoading = false
  },
  'GET_POSTS'(state, posts) {
    Vue.localStorage.set('getPosts', posts)
    state.posts = posts
  },
  'LOAD_MORE'(state, posts) {
    state.posts = posts
    state.page += 1
  },
  'LOVE_POST'(state, post) {
    let love_posts = Vue.localStorage.get('love_posts');
    if (!love_posts) {
      love_posts = [post.id];
    }
    else {
      love_posts = love_posts.push(post.id)
    }

    Vue.localStorage.set('love_posts', love_posts)
  }
}

const getters = {
  post: (state) => {
    return state.post
  },
  posts: (state) => {
    return state.posts
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

