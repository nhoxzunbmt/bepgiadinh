import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Category from '@/components/category/index';
import Post from '@/components/post/index';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post
    }
  ]
})
