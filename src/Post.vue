<script setup>
import Header from './components/Hearder.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import moment from 'moment';
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
}

onMounted(handleNews)
</script>

<template>
    <Header />
    <main>
        <div class="">
            <div v-for="post in news" :key="post.title" class="gap-2 grid p-4 w-full mx-auto max-w-5xl">
                <div class="flex items-start gap-4 p-2 shadow rounded">
                    <div class="w-1/3 h-60 rounded overflow-hidden shadow">
                        <img :src="post.urlToImage ? post.urlToImage : '/images/favicon.jpg'" :alt="post.title"
                            class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 h-full flex flex-col gap-2 justify-between">
                        <div>
                            <h2 class="text-lg font-semibold">{{ post.title }}</h2>
                            <div class="flex items-center gap-2 mb-4 text-sm font-light">
                                <p>{{ post.author }},</p>
                                <p>{{ moment(post.publishedAt).format('MMM DD, Y') }}</p>
                            </div>
                            <p>{{ post.description }}</p>
                        </div>
                        <div class="mb-1">
                            <a :href="'/post/' + post.title"
                                class="px-4 py-2 capitalize bg-black text-white rounded-full font-semibold">read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>