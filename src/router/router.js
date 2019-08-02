import Vue from "vue";
import Router from "vue-router";
import Layout from "../components/layout";

Vue.use(Router);

/**
 * 公共路由
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    hidden: true
  },

  {
    path: "/404",
    component: () => import("../views/404"),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: "/admin",
    component: Layout,
    redirect: '/admin/list',
    name: 'admin',
    meta: { title: '管理员', icon: 'dashboard' },
    children: [
      {
        path:'list',
        name:'list',
        meta: {
          title: '操作管理员',
          icon: 'dashboard',
          roles: ['index']
        },
        component:() => import( '../views/admin/Admin.vue')
      },
      {
        path:'group',
        name:'group',
        meta: {
          title: '管理组',
          icon: 'dashboard',
          roles: ['index']
        },
        component:() => import( '../views/admin/Group.vue')
      },
      {
        path:'roles',
        name:'roles',
        meta: {
          title: '权限方案',
          icon: 'dashboard',
          roles: ['index']
        },
        component:() => import( '../views/admin/Roles.vue')
      }
    ]
  }
];

export const asyncRoutes = [

];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();
router.addRoutes(asyncRoutes);

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
