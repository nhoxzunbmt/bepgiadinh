<template>
  <div class="home">
        <post-item :posts="posts"></post-item>
        <ul>
          <li v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </li>
        </ul>
        {{ statedata }}
  </div>
</template>

<script>
import PostItem from "@/components/post/item";
export default {
  components: {
    PostItem
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    categories() {
      return this.$store.getters.categories;
    },
    statedata(){
      return this.$store.state.mdpost
    }
  }
};
</script>


<style scoped>

</style>
