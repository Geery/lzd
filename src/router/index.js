import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/node',
    component: Layout,
    redirect: '/example/foundation',
    name: 'Node',
    meta: { title: 'Node教程', icon: 'example' },
    children: [
      {
        path: 'foundation',
        name: 'Node',
        component: () => import('@/views/node/index'),
        meta: { title: '基础', icon: 'table' }
      },
      {
        path: 'nodeapi',
        name: 'NodeApi',
        component: () => import('@/views/node/nodeapi'),
        meta: { title: 'Node的Api', icon: 'table' }
      },
      {
        path: 'koa',
        name: 'KOA',
        component: () => import('@/views/node/koa'),
        meta: { title: 'Koa', icon: 'table' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: () => import('@/views/tree/index'),
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/git',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Git',
        component: () => import('@/views/git/index'),
        meta: { title: 'Git', icon: 'form' }
      }
    ]
  },

  {
    path: '/html',
    component: Layout,
    redirect: '/html/canvas',
    name: 'Html',
    meta: {title: 'Html', icon: 'nested'},
    children: [
      {
        path: 'canvas',
        component: () => import('@/views/html/canvas/index'), // Parent router-view
        name: 'Canvas',
        meta: { title: 'Canvas小游戏',icon: 'table'  },
      },
      {
        path: '3d',
        name: 'NodeApi',
        component: () => import('@/views/node/nodeapi'),
        meta: { title: 'Node的Api', icon: 'table' }
      },
    ]
  },
  
  {
    path: '/javascript',
    component: Layout,
    redirect: '/javascript/ES6',
    name: 'Javascript',
    meta: {
      title: 'Javascript',
      icon: 'nested'
    },
    children: [
      {
        path: 'ES6',
        component: () => import('@/views/javascript/es6/array'), // Parent router-view
        name: 'Es6',
        meta: { title: 'Es6' },
        children: [
          {
            path: 'array',
            component: () => import('@/views/javascript/es6/array'),
            name: 'Array',
            meta: { title: '数组Array' }
          },
          {
            path: 'object',
            component: () => import('@/views/javascript/es6/object'),
            name: 'Object',
            meta: { title: '对象Object' }
          },
          // {
          //   path: 'menu1-2',
          //   component: () => import('@/views/nested/menu1/menu1-2'),
          //   name: 'Menu1-2',
          //   meta: { title: 'Menu1-2' },
          //   children: [
          //     {
          //       path: 'menu1-2-1',
          //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
          //       name: 'Menu1-2-1',
          //       meta: { title: 'Menu1-2-1' }
          //     },
          //     {
          //       path: 'menu1-2-2',
          //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
          //       name: 'Menu1-2-2',
          //       meta: { title: 'Menu1-2-2' }
          //     }
          //   ]
          // },
          // {
          //   path: 'menu1-3',
          //   component: () => import('@/views/nested/menu1/menu1-3'),
          //   name: 'Menu1-3',
          //   meta: { title: 'Menu1-3' }
          // }
        ]
      },
      // {
      //   path: 'ES6',
      //   component: () => import('@/views/nested/menu2/index'),
      //   meta: { title: 'ES6' }
      // }
    ]
  },

  {
    path: '/database',
    component: Layout,
    meta: { title: '数据库', icon: 'link' },
    children: [
      {
        path: 'mySql',
        component:() => import('@/views/database/mySql'),
        name:'MySQL',
        meta: { title: 'MySQL', icon: 'link' }
      },
      {
        path: 'mongoDB',
        component:() => import('@/views/database/mongoDB'),
        name:'MongoDB',
        meta: { title: 'MongoDB', icon: 'link' }
      }
    ]
  },
  {
    path: '/pack',
    component: Layout,
    meta: { title: '工程化', icon: 'link' },
    children: [
      {
        path: 'webpack',
        component:() => import('@/views/pack/index'),
        name:'Webpack',
        meta: { title: 'Webpack基础', icon: 'link' }
      },
      {
        path: 'webpack原理',
        component:() => import('@/views/pack/webpack-theory'),
        name:'Webpack-Theory',
        meta: { title: 'Webpack原理', icon: 'link' }
      }
    ]
  },
  {
    path: '/internet',
    component: Layout,
    meta: { title: '网络', icon: 'link' },
    children: [
      {
        path: 'index',
        component:() => import('@/views/internet/index'),
        name:'Internet',
        meta: { title: '网络基础', icon: 'link' }
      },{
        path: 'cpu',
        component:() => import('@/views/internet/jsNet'),
        name:'CPU',
        meta: { title: 'JS引擎的运行机制', icon: 'link' }
      },
    ]
  },
  {
    path: '/vue',
    component: Layout,
    meta: { title: 'Vue', icon: 'link' },
    children: [
      {
        path: 'index',
        component:() => import('@/views/vue/index'),
        name:'Internet',
        meta: { title: 'Vue组件化', icon: 'link' }
      },
      {
        path: 'vue-router',
        component:() => import('@/views/vue/vue-router'),
        name:'VueRouter',
        meta: { title: 'vue-router源码', icon: 'link' }
      },
      {
        path: 'vuex',
        component:() => import('@/views/vue/vuex'),
        name:'Vuex',
        meta: { title: 'vuex源码', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
