import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Category from '@/components/category/index';
import Post from '@/components/post/index';
import Test from '@/components/test/index2';
import Test2 from '@/components/test/index2';
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
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      children: [
        {
          path: '/index2',
          name: 'Test2',
          component: Test2,
        }
      ]
    }
  ]
})
