import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);


const routes = [
  {
    path: '/login',
    name: 'Login',
    component:()=> import("../views/Login.vue")
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/Main.vue"),
    children: [
      {
        path: "find",
        name: "Find",
        component: () => import("../views/HomeFind.vue"),
      },
      {
        path: "cate",
        name: "Cate",
        component: () => import("../views/HomeCate.vue"),
      },
      {
        path: "me",
        name: "Me",
        component: () => import("../views/HomeMe.vue"),
      },
    ],
  },
  {
    path: "/play/:id",
    name: "Play",
    component: () => import("../views/Play.vue"),
  },
  {
    path: "/cover",
    name: "DayCover",
    component: () => import("../views/DayCover.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: '/order',
    name: 'Order',
    component: ()=> import("../views/Order.vue")
  },
  {
    path: "/series",
    name: "Series",
    component: () => import("../views/Series.vue"),
  },
  {
    path: '/catelist',
    name: 'CateList',
    component:()=> import('../views/CateList.vue')
  },
  // 专题频道
  {
    path: '/album',
    name: 'Album',
    component:()=> import('../views/Album.vue')
  },
  // 热门频道
  {
    path: '/hotlist',
    name: 'HotList',
    component:()=> import('../views/HotList.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component:()=> import('../views/Account.vue')
  },
  {
    path: '/like',
    name: 'Like',
    component:()=> import('../views/Like.vue')
  },
  {
    path: '/secure',
    name: 'Secure',
    component:()=> import('../views/Secure.vue')
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component:()=> import('../views/Forgot.vue')
  },
  {
    path: '*',
    redirect: {
      name: 'Find'
    }
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
