<template>
  <div class="home">
        <post-item :posts="posts"></post-item>
        <ul>
          <li v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </li>
        </ul>
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
    }
  }
};
</script>


<style scoped>

</style>
