import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store';
import './assets/main.css'
import './assets/tailwind.css'

const app = createApp(App);
app.use(store); // Install the store instance as a plugin
app.mount('#app');