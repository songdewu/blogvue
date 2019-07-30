import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../components/layout'

Vue.use(Router)

/**
 * 公共路由
 */
export const constantRoutes =[
  {
    path: '/login',
    component: () => import('../views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('../views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    // children: [{
    //   path: 'dashboard',
    //   name: 'Dashboard',
    //   component: () => import('@/views/dashboard/index'),
    //   meta: { title: 'Dashboard', icon: 'dashboard' }
    // }]
  },
]


export const asyncRouter = [
    {
      path: '/ucenter',
      name: 'ucenter',
      // which is lazy-loaded when the route is visited.
      component: () => import( '../views/ucenter.vue'),
      children:[
        // {
        //   path:'',
        //   meta: {
        //     title: '首页',
        //     icon: 'lock',
        //     roles: ['index'] 
        //   },
        //   component:() => import( '../views/ucenter/index.vue')
        // }

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
