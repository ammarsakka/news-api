import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import VueMeta from 'vue-meta'
import router from './router'

createApp(App).use(VueMeta).use(router).mount('#app')
