import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import { createHead } from '@vueuse/head'

import Home from './Home.vue'
import Post from './Post.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { name: 'Home', path: '/', component: Home },
        { name: 'Post', path: '/post/:title', component: Post }
    ]
})

createApp(App).use(createHead()).use(router).mount('#app')
