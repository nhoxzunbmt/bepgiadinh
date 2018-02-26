<template>
  <div class="home">
        <post-item :posts="posts"></post-item>
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
      return this.$store.getters.posts
    }
  }
};
</script>


<style scoped>

</style>
