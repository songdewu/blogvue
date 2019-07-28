import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

/**
 * 公共路由
 */
export const constantRoutes =[
  {
    path: '/',
    name: 'home',
    // redirect:'/',
    component: Home,
    children:[
      {
        path:'',
        component:() => import(/* webpackChunkName: "about" */ './views/home/index.vue')
      },
      {
        path:'business',
        component:() => import(/* webpackChunkName: "about" */ './views/home/business.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
  },
  // {
  //   path: '*',
  //   name: '404',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/404.vue')
  // },
]


export const asyncRouter = [
    {
      path: '/ucenter',
      name: 'ucenter',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/ucenter.vue'),
      children:[
        {
          path:'',
          meta: {
            title: '首页',
            icon: 'lock',
            roles: ['index'] // you can set roles in root nav
          },
          component:() => import(/* webpackChunkName: "about" */ './views/ucenter/index.vue')
        },
        {
          path:'person',
          meta: {
            title: '个人',
            icon: 'lock',
            roles: ['person'] // you can set roles in root nav
          },
          component:() => import(/* webpackChunkName: "about" */ './views/ucenter/person.vue')
        },
        {
          path:'pay',
          meta: {
            title: '金融',
            icon: 'lock',
            roles: ['pay'] // you can set roles in root nav
          },
          component:() => import(/* webpackChunkName: "about" */ './views/ucenter/pay.vue')
        }
      ]
    },
  ]



const createRouter = () => new Router({
   mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter();
// router.addRoutes(asyncRouter);

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
