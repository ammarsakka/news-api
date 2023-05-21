import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from './Home.vue'
import Post from './Post.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'Home', path: '/', component: Home },
        { name: 'Post', path: '/post/:title', component: Post}
    ]
})

createApp(App).use(router).mount('#app')
