import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'
// 引入路由中需要使用的组件功能
// import Login from '@/views/login/index'
// import Layout from '@/views/layout/index'
// import Home from '@/views/home/index'
// import Role from '@/views/role/index'
// import Menu from '@/views/menu/index'
// import Resource from '@/views/resource/index'
// import Course from '@/views/course/index'
// import User from '@/views/user/index'
// import Advert from '@/views/advert/index'
// import AdvertSpace from '@/views/advert-space/index'
// import ErrorPage from '@/views/error-page/index'
Vue.use(VueRouter)
// 路由规则
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    // 直接给某个路由设置，这时内部的子路由都需要验证（包含当前路由）
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('@/views/role/index')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/menu/index')
      },
      {
        path: '/resource',
        name: 'resource',
        component: () => import('@/views/resource/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import('@/views/course/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/index')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () => import('@/views/advert/index')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () => import('@/views/advert-space/index')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () => import('@/views/menu/menuCreate')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        component: () => import('@/views/menu/edit')
      },
      {
        path: '/role/:roleId/alloc-menu',
        name: 'alloc-menu',
        component: () => import(/* webpackChunkName: 'alloc-menu' */'@/views/role/alloc-menu'),
        props: true
      },
      // 添加课程组件
      {
        path: '/course/create',
        name: 'course-create',
        component: () => import(/* webpackChunkName: 'course-create' */'@/views/course/create')
      },
      // 编辑课程组件
      {
        path: '/course/:courseId/edit',
        name: 'course-edit',
        component: () => import(/* webpackChunkName: 'course-edit' */'@/views/course/edit'),
        props: true
      },
      // 课程内容组件
      {
        path: '/course/:courseId/section',
        name: 'course-section',
        component: () => import(/* webpackChunkName: 'course-section' */'@/views/course/section'),
        props: true
      },
       // 上传课时视频
       {
        path: '/course/:courseId/video',
        name: 'course-video',
        component: () => import(/* webpackChunkName: 'course-video' */'@/views/course/video'),
        props: true
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: import('@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫，在路由跳转之前进行功能设置
router.beforeEach((to, from, next) => {
  // 验证to路由是否需要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 验证Vuex中的store中的登陆用户信息是否存储
    if (!store.state.user) {
      return next({
        name: 'login',
        query: {
          // 将本次路由的fullpath传递给login页面
          redirect: to.fullPath
        }
      })
    }
    // 已经登陆 允许通过
    next()
  } else {
    next()
  }
})

export default router
