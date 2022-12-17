import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Auth/Login';
import Wrapper from '@/views/Wrapper';
import Home from '@/views/Home';
import HomeAdmin from '@/views/HomeAdmin';

import middleware from '@/middleware';

const routes = [
  {
    path: '/login',
    name: 'login-page',
    component: Login,
    beforeEnter:middleware.guest
  },
  {
    path:'/',
    name:'wrapper-page',
    component: Wrapper,
    beforeEnter:middleware.user,
    children: [
      {
        path:'/home',
        name:'home-page',
        component: Home,
        beforeEnter: middleware.SuperAdmin
      },
      {
        path:'/admin',
        name:'home-admin',
        component: HomeAdmin,
        beforeEnter: middleware.Admin
      },
      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;