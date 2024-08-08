import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'
import LandingPage from '@/components/LandingPage.vue';
import store from './store/store';
import './assets/main.css'
import './assets/tailwind.css'

const routes = [
    { path: '/', component: LandingPage },
];

const router = createRouter({
    // history: createMemoryHistory(),
    history: createWebHistory(import.meta.env.BASE_URL || '/'),
    routes,
})

const app = createApp(App);
app.use(store); // Install the store instance as a plugin
app.use(router);
app.mount('#app');