import { createApp } from 'vue'
import './style.css'
import './index.css'
import 'flowbite';
import App from './App.vue'
import router from "./router.js"
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')

