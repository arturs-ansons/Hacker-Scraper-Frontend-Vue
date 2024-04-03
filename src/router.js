// router.js
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import Register from './components/RegisterUser.vue';
import Login from './components/LoginUser.vue';
import Articles from './components/ArticleList.vue';

const routes = [
  { path: '/register', component: Register, meta: { requiresGuest: true } },
  { path: '/login', component: Login, meta: { requiresGuest: true } },
  { path: '/articles', component: Articles, meta: { requiresAuth: true } },
  { path: '/logout', meta: { requiresAuth: true }, 
    beforeEnter: (to, from, next) => {
      store.dispatch('logout')
        .then(() => {
          next('/login');
        })
        .catch(error => {
          console.error('Logout error:', error);
          next('/login');
        });
    }
  },
  { path: '/', redirect: '/articles' }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && store.getters.isAuthenticated) {
    next('/articles');
  } else {
    next();
  }
});

export default router;
