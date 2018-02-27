import axios from 'axios'
const API_BASE = process.env.API_URL;

const state = {
  module: 'category',
  page: 1,
  categories: [],
  category: []
}

const mutations = {
  'GET_CATEGORY'(state, category) {
    state.category = category
  },
  'GET_CATEGORIES'(state, categories) {
    state.categories = categories
  }
}

const actions = {
  getCategory: ({ commit }, id) => {
    axios.get(`${API_BASE}wp/v2/categories/${id}`).then(response => {
      commit('GET_CATEGORY', response.data)
    })
  },
  getCategories: ({ commit }) => {
    axios.get(`${API_BASE}wp/v2/categories`).then(response => {
      commit('GET_CATEGORIES', response.data)
    })
  }
};

const getters = {
  category: state => {
    return state.category
  },
  categories: state => {
    return state.categories
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

