import Vue from 'vue'
import Vuex from 'vuex'

import post from './modules/post'
import category from './modules/category'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        mdpost:post,
        mdcategory:category
    }
})
