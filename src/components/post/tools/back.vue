<template>
    <div class="btn_back">
        <a class="btn btn-default " href="#" @click.prevent="back">Back</a>
    </div>
</template>

<script>
    export default {
        methods:{
            back(){
                this.$router.push({
                    name: 'Home', 
                    params: {}
                });
            }
        }
    }
</script>

<style scoped>
.btn_back{
    display: block;
    float:left;
}
</style>