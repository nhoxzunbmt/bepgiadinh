<template>

<div>
  123
</div>

</template>

<script>
import PostItem from "@/components/post/item_2";
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
    this.$store.dispatch("getPosts");
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
  .post_full_width{
    padding: 0
  }
</style>
