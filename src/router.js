// router.js
import { createRouter, createWebHistory } from 'vue-router';
import store from './store'; // Import your Vuex store
import Register from './components/RegisterUser.vue';
import Login from './components/LoginUser.vue';
import Articles from './components/ArticleList.vue';

const routes = [
  { path: '/register', component: Register, meta: { requiresGuest: true } },
  { path: '/login', component: Login, meta: { requiresGuest: true } },
  { path: '/articles', component: Articles, meta: { requiresAuth: true } },
  { path: '/logout', meta: { requiresAuth: true }, 
    beforeEnter: (to, from, next) => {
      // Perform logout action here
      store.dispatch('logout')
        .then(() => {
          next('/login'); // Redirect to login after logout
        })
        .catch(error => {
          console.error('Logout error:', error);
          next('/login'); // Redirect to login even if logout fails
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
    next('/login'); // Redirect to login if requiresAuth and not authenticated
  } else if (to.meta.requiresGuest && store.getters.isAuthenticated) {
    next('/articles'); // Redirect to articles if requiresGuest and authenticated
  } else {
    next(); // Proceed with navigation
  }
});

export default router;
