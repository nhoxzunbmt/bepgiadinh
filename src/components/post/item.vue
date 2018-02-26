<template>
    <div>
        <p v-for="post in posts" :key="post.id">
            {{ post.title }}
            
            <router-link :to="{ name: 'Post', params: { id: post.id }}">Xem</router-link>
        </p>
    </div>
</template>

<script>

    export default {
        props: {
            posts: {
                type: Array,
                require: true,
                default: function () {
                    return []
                }
            },
        }
    }
</script>

<style scoped>

</style>