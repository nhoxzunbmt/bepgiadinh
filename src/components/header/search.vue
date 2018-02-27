<template>
    <div>
            <input type="text" placeholder="Search" @change="searchPosts" v-model="keyword">
    </div>
</template>

<script>
    export default {
        name:'Search',
        data() {
            return {
                keyword: ''
            }
        },
        methods: {
            searchPosts () {
                this.$store.dispatch('searchPost',this.keyword);
            }
        }
    }
</script>

<style scoped>

</style>