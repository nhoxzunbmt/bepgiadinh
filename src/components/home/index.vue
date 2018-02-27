<template>
  <div class="home">
        <post-item :posts="posts"></post-item>
        <ul>
          <li v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </li>
        </ul>


      <a href="#" @click="loadMore">Load More</a>
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
    page(){
      return this.$store.getters.page;
    }
  },
  created() {
    if (this.posts.length === 0) {
      this.$store.dispatch("getPosts");
    }
    this.$store.dispatch("getCategories");
  },
  methods : {
    loadMore(){
      let next_page = this.page + 1;
      this.$store.dispatch("loadMore",next_page);
    }
  }
};
</script>


<style scoped>

</style>
