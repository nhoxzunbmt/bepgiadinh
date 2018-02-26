<template>
    <div>
        <a href="#" @click="bookmark">Bookmark</a>
    </div>
</template>

<script>
    export default {
        methods : {
            bookmark (){
                alert('Bookmarked')
            }
        }
    }
</script>

<style scoped>

</style>