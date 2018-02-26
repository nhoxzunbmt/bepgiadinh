const state = {
  posts: [
    {
      id: 1,
      title: "Bai so 1",
      ex: "Mota 1"
    },
    {
      id: 2,
      title: "Bai so 2",
      ex: "Mota 2"
    }
  ],
  page: 1
}

const mutations = {
  'GET_POSTS' (state,posts){
    state.posts = posts
  }
}

const actions = {
  loadMore: ({ commit }, order) => {
    commit('LOAD_MORE',order);
  }
};

const getters = {
  posts: state => {
    console.log( state.posts );
     return state.posts
   }
}

export default {
  state,
  mutations,
  actions,
  getters
}

