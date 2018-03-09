import Vue from 'vue'


const state = {
    counter: 0,
}

const actions = {
    increase: ({ commit, state }) => {
        commit('increase', {
            amount: state.counter + 1,
            meta: {
                analytics: [
                    ['event',
                        {
                            eventCategory: 'counter',
                            eventAction: 'increase',
                            eventValue: state.counter + 1
                        }
                    ]
                ]
            }
        })
    }
};

const mutations = {
    increase(state, { amount }) {
        state.counter = amount
    }
}

const getters = {
    counter: (state) => {
        return state.counter
    },
}



export default {
    state,
    mutations,
    actions,
    getters
}
