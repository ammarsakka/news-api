import { createRouter, createWebHistory } from 'vue-router'

import Home from '../Home.vue'
import Post from '../Post.vue'

export default createRouter({
    history: createWebHistory(),
    routes: [
        { name: 'Home', path: '/', component: Home },
        { name: 'Post', path: '/post/:title', component: Post }
    ]
})