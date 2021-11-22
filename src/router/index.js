import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import login from '@/components/login'
import home from '@/components/home'
import createcomp from '@/components/createcomp'
import deletecomp from '@/components/deletecomp'
import more from '@/components/more'

Vue.use(Router)

// 创建一个路由器实例，并且配置路由规则
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      },
      children: [
        {name: 'createcomp', path: '/createcomp', component: createcomp},
        {name: 'deletecomp', path: '/deletecomp', component: deletecomp},
        {name: 'more', path: '/more', component: more},

        
      ]
    },

  ]
})

//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath } // 将刚刚要去的路由path（却无权限）作为参数，方便登录成功后直接跳转到该路由
      });
    }
  } else {
    next(); //如果无需token,那么随它去吧
  }
});

export default router;
