<script>
import Header from './components/Hearder.vue'

export default {
    data() {
        return {
            loading: false,
            news: [],
            error: null
        }
    },
    created() {
        this.$watch(
            () => this.$route.params,
            () => { this.fetchData() },
            { immediate: true }
        )
    },
    methods: {
        async fetchData() {
            this.loading = true

            const data = await fetch('https://newsdata2.p.rapidapi.com/news?language=en', {
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

            this.news = data.results
        }
    },
    components: {
        'v-header': Header
    },
    metaInfo: {
        title: 'hello'
    }
}

</script>

<template>
    <v-header />
    <main>
        <div class="">
            <div v-for="post in news" :key="post.title" class="gap-2 grid p-4 w-full mx-auto max-w-5xl">
                <div class="flex items-start gap-4 p-2 shadow rounded">
                    <div class="w-1/3 h-60 rounded overflow-hidden shadow">
                        <img :src="post.image_url ? post.image_url : '/images/favicon.jpg'" :alt="post.title"
                            class="w-full h-full object-cover">
                    </div>
                    <div class="w-2/3 h-full flex flex-col gap-2 justify-between">
                        <div>
                            <h2 class="text-lg font-semibold">{{ post.title }}</h2>
                            <div class="flex items-center gap-2 mb-4 text-sm font-light">
                                <p v-for="author in post.creator">{{ author }},</p>
                                <!-- <p>{{ moment(post.pubDate).format('MMM DD, Y') }}</p> -->
                                <p>{{ post.pubDate}}</p>
                            </div>
                            <p>{{ post.description }}</p>
                        </div>
                        <div class="mb-1">
                            <a :href="'#/post/' + post.title"
                                class="px-4 py-2 capitalize bg-black text-white rounded-full font-semibold">read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
