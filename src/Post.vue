<script setup>
import Header from './components/Hearder.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue';
import moment from 'moment';
import { useHead } from '@vueuse/head'

const title = useRoute().params.title

const news = ref([])

const handleNews = async () => {
    const data = await fetch(`https://newsdata2.p.rapidapi.com/news?language=en&q=${title}`, {
        method: 'GET', headers: {
            'X-RapidAPI-Key': 'b52a40ec8bmshe260931ab62b61cp10d6abjsnf8ebb9b28a3a',
            'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com'
        }
    }).then((data) => {
        return data.json()
    }).then((result) => {
        return result
    })
    // console.log(data)
    news.value = data.results

    useHead({
        title: `Ammar News - ${data.results[0].title}`,
        meta: [
            { name: 'description', content: data.results[0].description },
            { name: 'twitter:image', content: data.results[0].image_url ? data.results[0].image_url : '/images/favicon.jpg' },
            { name: 'twitter:image:alt', content: data.results[0].title },
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
                        <img :src="post.image_url ? post.image_url : '/images/favicon.jpg'" :alt="post.title"
                            class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 h-full flex flex-col gap-2 justify-between">
                        <div>
                            <h2 class="text-3xl font-semibold">{{ post.title }}</h2>
                            <div class="flex items-center gap-2 mb-4 text-sm font-light">
                                <p v-for="author in post.creator">{{ author }},</p>
                                <p>{{ moment(post.pubDate).format('MMM DD, Y') }}</p>
                            </div>
                            <p class="text-lg">{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>