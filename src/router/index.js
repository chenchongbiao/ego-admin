import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '公益服务管理系统', icon: 'dashboard' }
    }]
  }]
/**
 * 动态路由
 */
export const asyncRoutes = [

  // 管理员
  // {
  //   path: '/admin',
  //   component: Layout,
  //   redirect: '/admin/list',
  //   name: '管理员',
  //   meta: { title: '管理员', icon: 'example' },
  //   children: [
  //     {
  //       path: 'list',
  //       name: '管理员列表',
  //       component: () => import('@/views/ego/admin/list'),
  //       // @/相当于./
  //       meta: { title: '管理员列表', icon: 'table' }
  //     },
  //     {
  //       path: 'add',
  //       name: '添加管理员',
  //       component: () => import('@/views/ego/admin/add'),
  //       meta: { title: '添加管理员', icon: 'tree' }
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: '修改管理员',
  //       component: () => import('@/views/ego/admin/add'),
  //       meta: { title: '修改管理员', noCache: true },
  //       hidden: true
  //     }
  //   ]
  // },

  // 活动分类管理
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '活动分类管理',
    meta: { title: '活动分类', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '活动分类列表',
        component: () => import('@/views/ego/activity_subject/list'),
        // @/相当于./
        meta: { title: '活动分类列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加活动分类',
        component: () => import('@/views/ego/activity_subject/add'),
        meta: { title: '添加活动分类', icon: 'tree' }
      }
    ]
  },

  // 志愿者组织管理
  {
    path: '/team',
    component: Layout,
    redirect: '/team/list',
    name: '志愿者组织',
    meta: { title: '志愿者组织', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '志愿者组织列表',
        component: () => import('@/views/ego/team/list'),
        // @/相当于./
        meta: { title: '志愿者组织列表', icon: 'table' }
      },
      {
        path: 'add',
        name: '添加志愿者组织',
        component: () => import('@/views/ego/team/add'),
        meta: { title: '添加志愿者组织', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '修改志愿者组织',
        component: () => import('@/views/ego/team/add'),
        meta: { title: '修改志愿者组织', noCache: true },
        hidden: true
      }
    ]
  },

  // 活动管理
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/list',
    name: '活动管理',
    meta: { title: '活动管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '活动列表',
        component: () => import('@/views/ego/activity/list'),
        // @/相当于./
        meta: { title: '活动列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '活动信息',
        component: () => import('@/views/ego/activity/info'),
        meta: { title: '活动信息', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: '编辑活动基本信息',
        component: () => import('@/views/ego/activity/info'),
        meta: { title: '编辑活动基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'PublishEdit',
        component: () => import('@/views/ego/activity/publish'),
        meta: { title: '发布活动', noCache: true },
        hidden: true
      }
    ]
  },

  // {
  //   path: '/sta',
  //   component: Layout,
  //   redirect: '/sta/create',
  //   name: '统计分析',
  //   meta: { title: '统计分析', icon: 'example' },
  //   children: [
  //     {
  //       path: 'create',
  //       name: '生成数据',
  //       component: () => import('@/views/sta/create'),
  //       meta: { title: '生成数据', icon: 'table' }
  //     },
  //     {
  //       path: 'show',
  //       name: '图表显示',
  //       component: () => import('@/views/sta/show'),
  //       meta: { title: '图表显示', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/power',
    component: Layout,
    redirect: '/power/user/list',
    name: '权限管理',
    meta: { title: '权限管理', icon: 'chart' },
    children: [
      {
        path: 'user/list',
        name: '用户管理',
        component: () => import('@/views/power/user/list'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role/list',
        name: '角色管理',
        component: () => import('@/views/power/role/list'),
        meta: { title: '角色管理' }
      },
      {
        path: 'role/form',
        name: '角色添加',
        component: () => import('@/views/power/role/form'),
        meta: { title: '角色添加' },
        hidden: true
      },
      {
        path: 'role/update/:id',
        name: '角色修改',
        component: () => import('@/views/power/role/form'),
        meta: { title: '角色修改' },
        hidden: true
      },
      {
        path: 'role/distribution/:id',
        name: '角色权限',
        component: () => import('@/views/power/role/roleForm'),
        meta: { title: '角色权限' },
        hidden: true
      },
      {
        path: 'menu/list',
        name: '菜单管理',
        component: () => import('@/views/power/menu/list'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'user/add',
        name: '用户添加',
        component: () => import('@/views/power/user/form'),
        meta: { title: '用户添加' },
        hidden: true
      },
      {
        path: 'user/update/:id',
        name: '用户修改',
        component: () => import('@/views/power/user/form'),
        meta: { title: '用户修改' },
        hidden: true
      },
      {
        path: 'user/role/:id',
        name: '用户角色',
        component: () => import('@/views/power/user/roleForm'),
        meta: { title: '用户角色' },
        hidden: true
      }

    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router
