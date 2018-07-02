import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index'
import Category from '@/components/category/index';
import Post from '@/components/post/index';
import Test from '@/components/test/index2';
import Test2 from '@/components/test/index2';
import Analytics from '@/components/test/analytics'
import Auth from '@/components/test/auth'

import Login from '@/components/pages/Login.vue'
import Account from '@/components/pages/Account.vue'
import Register from '@/components/pages/Register.vue'
import Admin from '@/components/pages/Admin.vue'

import Page403 from '@/components/pages/403.vue'
import Page404 from '@/components/pages/404.vue'

import Products from '@/components/pages/admin/Products.vue'
import Product from '@/components/pages/admin/Product.vue'
import ProductInfo from '@/components/pages/admin/ProductInfo.vue'
import ACL from '@/components/test/acl.vue'
import ZONE from '@/components/test/zone.vue'

import OV from '@/components/test/overdrive.vue'
import OV_DETAIL from '@/components/test/overdrive-detail.vue'

import Transitions from '@/components/test/transitions.vue'
import Rating from '@/components/test/rating.vue'
import Share from '@/components/test/share.vue'
import Loading from '@/components/test/loading.vue'
import Scroll from '@/components/test/scroll.vue'

import FB from '@/components/firebase/index.vue'
import AUTH1 from '@/components/firebase/auth.vue'
import FB_MS from '@/components/firebase/messaging.vue'
import Oauth2 from '@/components/pages/Oauth2.vue'
import Oauth3 from '@/components/pages/Oauth3.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/fb-noti',
      name: 'FB_MS',
      component: FB_MS
    },
    {
      path: '/auth1',
      name: 'AUTH1',
      component: AUTH1
    },
    {
      path: '/firebase',
      name: 'FB',
      component: FB,
      children: [
        {
          path: '/add',
          name: 'FB_ADD',
          component: FB,
        }

      ]
    },
    {
      path: '/test',
      name: 'Test',
      component: Scroll,
      children: [
        {
          path: '/index2',
          name: 'Test2',
          component: Test2,
        }
      ]
    },
    {
      path: '/overdive',
      name: 'overdive',
      component: OV
    },
    {
      path: '/overdive-detail/:slug/',
      name: 'overdive_detail',
      component: OV_DETAIL
    },
    {
      path: '/zone',
      name: 'zone',
      component: ZONE
    },
    {
      path: '/acl',
      name: 'acl',
      component: ACL
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
      path: '/login/:type',
      name: 'facebooklogin',
      component: Oauth2
  },
    {
      path: '/oauth2',
      name: 'oauth2',
      component: Oauth2
    }
    // {
    //   path: '/t-ana',
    //   name: 'Ana',
    //   component: Analytics
    // },
    // {
    //   path: '/auth',
    //   name: 'Auth',
    //   component: Auth
    // },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: Login,
    //   meta: { auth: false }
    // }, {
    //   path: '/login/:type',
    //   name: 'oauth2-type',
    //   component: require('@/components/pages/Oauth2.vue')
    // }, {
    //   path: '/register',
    //   name: 'register',
    //   component: Register,
    //   meta: { auth: false }
    // }, {
    //   path: '/oauth1',
    //   name: 'oauth1',
    //   component: require('@/components/pages/Oauth1.vue')
    // }, {
    //   path: '/oauth2',
    //   name: 'oauth2',
    //   component: require('@/components/pages/Oauth2.vue')
    // }, {
    //   path: '/account',
    //   name: 'account',
    //   component: Account,
    //   meta: { auth: true }
    // }, {
    //   path: '/async',
    //   name: 'async',
    //   component: function (resolve) { require(['@/components/pages/Async.vue'], resolve); }
    // }, {
    //   path: '/admin',
    //   name: 'admin',
    //   component: Admin,
    //   meta: { auth: { roles: 'admin', redirect: { name: 'default' }, forbiddenRedirect: '/403' } },
    //   children: [{
    //     patah: 'products',
    //     name: 'admin-products',
    //     component: Products,
    //     children: [{
    //       path: ':product_id',
    //       name: 'admin-product',
    //       component: Product,
    //       children: [{
    //         path: 'info',
    //         name: 'admin-product-info',
    //         component: ProductInfo,
    //         meta: { auth: undefined }
    //       }, {
    //         path: 'media',
    //         name: 'admin-product-media',
    //         component: require('@/components/pages/admin/ProductMedia.vue')
    //       }]
    //     }]
    //   }]
    // }, {
    //   path: '/users',
    //   name: 'users',
    //   component: require('@/components/pages/Users.vue'),
    //   meta: { auth: ['admin'] }
    // }, {
    //   path: '/404',
    //   name: 'error-404',
    //   component: Page404
    // }, {
    //   path: '/403',
    //   name: 'error-403',
    //   component: Page403
    // }, {
    //   path: '/502',
    //   name: 'error-502',
    //   component: require('@/components/pages/502.vue')
    // }
  ]
})
