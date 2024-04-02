// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'; // Import Vuex store

const app = createApp(App);
app.use(router);
app.use(store); // Use Vuex store
app.mount('#app');
