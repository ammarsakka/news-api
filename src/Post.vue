<script setup>
import Header from './components/Hearder.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import moment from 'moment';
import { useHead } from '@vueuse/head'

const title = useRoute().params.title

const news = ref([])

const handleNews = async () => {
    const data = await fetch(`https://newsapi.org/v2/everything?q=${title}&from=2023-05-20&to=2023-05-20&sortBy=publishedAt&language=en&apiKey=7db9b882213f463c8a23307e3a8c2a59`).then((data) => {
        return data.json()
    }).then((result) => {
        return result
    })
    // console.log(data)
    news.value = data.articles

    useHead({
        title: `Ammar News - ${data.articles[0].title}`,
        meta: [
            { name: 'description', content: data.articles[0].description },
            { name: 'twitter:image', content:  data.articles[0].urlToImage ? data.articles[0].urlToImage : '/images/favicon.jpg'},
            { name: 'twitter:image:alt', content:  data.articles[0].title},
        ]
    })
}

onMounted(() => {
    handleNews()
})
</script>

<template>
    <Header />
    <main>
        <div class="">
            <div v-for="post in news" :key="post.title" class="grid p-4 w-full mx-auto max-w-5xl">
                <div class="grid gap-4 p-2">
                    <div class="w-full h-auto rounded overflow-hidden shadow">
                        <img :src="post.urlToImage ? post.urlToImage : '/images/favicon.jpg'" :alt="post.title"
                            class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 h-full flex flex-col gap-2 justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold">{{ post.title }}</h2>
                            <div class="flex items-center gap-2 mb-4 text-sm font-light">
                                <p>{{ post.author }},</p>
                                <p>{{ moment(post.publishedAt).format('MMM DD, Y') }}</p>
                            </div>
                            <p class="text-lg">{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>