const state = {
  module: 'category',
  page: 1,
  categories: [
    {
      id: 1,
      name: "Mon ngon",
      ex: "Mota 1"
    },
    {
      id: 2,
      name: "Mon Man",
      ex: "Mota 2"
    }
  ]
}

const mutations = {
  'GET_POSTS'(state, posts) {
    state.posts = posts
  }
}

const actions = {
  loadMore: ({ commit }, order) => {
    commit('LOAD_MORE', order);
  }
};

const getters = {
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

