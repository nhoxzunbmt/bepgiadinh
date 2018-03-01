import axios from 'axios'
import Vue from 'vue'
import {
    ADD_COMMENT,
    ADD_COMMENT_SUCCESSS,
    COMMENTS_BY_POST,
    COMMENTS_BY_POST_SUCCESSS
} from '../mutation-types';

const API_BASE = process.env.API_URL;

const state = {
    module: 'comment',
    comments: null,
    comment: null,
}



const actions = {
    getComment: ({ commit }, id) => {
        state.isLoading = true;
        axios.get(`${API_BASE}wp/v2/posts/${id}`).then(response => {
            commit('GET_COMMENT', response.data)
        })
    },
    getComments: ({ commit }, payload) => {
        commit(COMMENTS_BY_POST);
        axios.get(`${API_BASE}wp/v2/comments?post=${payload.post_id}`).then(response => {
            console.log('getComments',response.data);
            commit(COMMENTS_BY_POST_SUCCESSS, response.data)
        })
    },
    loadMore: ({ commit }, page) => {
        axios.get(`${API_BASE}wp/v2/posts?order=desc&page=${page}`).then(response => {

            commit('LOAD_MORE_COMMENTS', response.data)
        })
    },
    lovePost: ({ commit }, post_id) => {
        axios.get(`${API_BASE}wp/v2/posts/${post_id}`).then(response => {
            commit('LOVE_COMMENT', response.data)
        })
    },
    addComment: ({ commit }, payload) => {
        commit(ADD_COMMENT)
        axios.post(`${API_BASE}wp/v2/comments/`, payload).then(response => {
            commit(ADD_COMMENT_SUCCESSS, response.data)
        })
    },
};

const mutations = {
    'GET_COMMENT'(state, post) {
        state.post = post
        state.isLoading = false
    },
    'GET_COMMENTS'(state, posts) {
        Vue.localStorage.set('getPosts', posts)
        state.posts = posts
    },
    'LOAD_MORE_COMMENTS'(state, posts) {
        state.posts = posts
        state.page += 1
    },
    'LOVE_COMMENT'(state, post) {
        let love_posts = Vue.localStorage.get('love_posts');
        if (!love_posts) {
            love_posts = [post.id];
        }
        else {
            love_posts = love_posts.push(post.id)
        }

        Vue.localStorage.set('love_posts', love_posts)
    },
    COMMENTS_BY_POST(state) {
        state.isLoading = false

    },
    COMMENTS_BY_POST_SUCCESSS(state, payload) {
        state.isLoading = true
        state.comments = payload
        console.log(COMMENTS_BY_POST_SUCCESSS,payload)
    }
}

const getters = {
    comment: (state) => {
        return state.comment
    },
    comments: (state) => {
        return state.comments
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}

