<script>
import Header from './components/Hearder.vue'

export default {
    data() {
        return {
            title: null,
            news: [],
            loading: false
        }
    },
    created() {
        this.$watch(
            () => { this.title = this.$route.params.title },
            () => { this.fetchData() },
            { immediate: true }
        )
    },
    methods: {
        async fetchData() {
            this.loading = true
            const data = await fetch(`https://newsdata2.p.rapidapi.com/news?language=en&q=${this.$route.params.title}`, {
                method: 'GET', headers: {
                    'X-RapidAPI-Key': 'b52a40ec8bmshe260931ab62b61cp10d6abjsnf8ebb9b28a3a',
                    'X-RapidAPI-Host': 'newsdata2.p.rapidapi.com'
                }
            }).then((data) => {
                return data.json()
            }).then((result) => {
                this.loading = false
                return result
            })
            // console.log(data)
            this.news = data.results
        }
    },
    components: {
        'v-header': Header
    },
    metaInfo: {
        title: 'post',
        titleTemplate: '%s | vue-meta Example App',
        meta: [
            { name: 'description', content: 'An example Vue application with vue-meta.' }
        ]
    }
}
</script>

<template>
    <v-header />
    <main>
        <div class="">
            {{ loading }}
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
                                <!-- <p>{{ moment(post.pubDate).format('MMM DD, Y') }}</p> -->
                                <p>{{ post.pubDate }}</p>
                            </div>
                            <p class="text-lg">{{ post.content }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>