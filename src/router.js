import Vue from 'vue'
import Router from 'vue-router'
import Footer from '@/components/Footer'

Vue.use(Router)
const router = new Router({
  mode: 'history', 
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/",
      redirect:"/home"
    },
    // {
    //   path:"/user",
    //   // redirect:"/user/nologin"
    // },
    {
      // path: '/detail',// 浏览器地址输入home时
       path: '/register',// 浏览器地址输入home时
      name: 'register',// 路由的名字，命名路由
      components:{
        default: () => import('./views/register/index.vue')   ,
        // footer:Footer
      }
    },
    {
      // path: '/detail',// 浏览器地址输入home时
       path: '/login',// 浏览器地址输入home时
      name: 'login',// 路由的名字，命名路由
      components:{
        default: () => import('./views/login/index.vue')   ,
        // footer:Footer
      }
    },
    {
      // path: '/detail',// 浏览器地址输入home时
       path: '/detail/:id',// 浏览器地址输入home时
      name: 'detail',// 路由的名字，命名路由
      components:{
        default: () => import('./views/detail/index.vue')   ,
        // footer:Footer
      }
    },
    {
      path: '/home',// 浏览器地址输入home时
      name: 'home',// 路由的名字，命名路由
      alias:'/gang',
      // component: () => import('./views/home/index.vue')// 懒加载
      components:{
        default: () => import('./views/home/index.vue')   ,
        footer:Footer
      },
      meta: {// 缓存内容不消失 用于返回到原来位置 动态属性 避免组件的重新渲染
        keepAlive:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      // component: () => import('./views/cart/index.vue')
      components:{
        default: () => import('./views/cart/index.vue')   ,
        footer:Footer
      },
      // 路由独享守卫 一般不推荐使用 本来就是路由配置文件 不要写业务逻辑
      // beforeEnter(to,from,next){
      //   if(localStorage.getItem("isLogin") === "ok"){
      //     next()
      //   }else{
      //     next("/login")
      //   }
      // }
    },
    {
      path: '/kind',
      name: 'kind',
      // component: () => import('./views/kind/index.vue')
      components:{
        default: () => import('./views/kind/index.vue')   ,
        // footer:Footer
      }
    },
    {
      path: '/user',
      name: 'user',
      // component: () => import('./views/user/index.vue')
      components:{
        default: () => import('./views/user/index.vue')   ,
        footer:Footer
      },
      children : [
        // {
        //   path:'',
        //   redirect:"NoLogin"
        // },
        {
          path: 'login',
          component: () => import('@/components/user/Login.vue')
        },
        {
          path: 'nologin',
          component: () => import('@/components/user/NoLogin.vue')
        }
      ]
      
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '*',
      component: () => import('@/components/NotFondComponents.vue')
    }

  ]
})
// 全局导航守卫 (一般不推荐使用)
// router.beforeEach((to,from,next)=>{
//   if(to.name==="login"||to.name === 'register'||localStorage.getItem("isLogin")==="ok" ){
//     next()
//   }else{
//     next('/login')
//   }
// })
export default router
