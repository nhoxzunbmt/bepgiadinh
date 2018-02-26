const state = {
  stocks: []
}

const mutations = {
  'SET_STOCKS' (state,stocks){
    state.stocks = stocks
  }
}

const actions = {
  buyStock: ({ commit }, order) => {
    commit('BUY_STOCK',order);
  }
};

const getters = {
   stocks: state => {
     return state.stocks
   }
}

export default {
  state,
  mutations,
  actions,
  getters
}

