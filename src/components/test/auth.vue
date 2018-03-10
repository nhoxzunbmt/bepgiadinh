<template>
    <div>
        <div v-if="$auth.ready">
            Is Auth
        </div>
        <div v-if="!$auth.ready()">
            Loading...
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>