<template>
  <div class="home">
        <post-item :posts="posts"></post-item>
  </div>
</template>

<script>
import PostItem from "@/components/post/item";
export default {
  name: "Home",
  components: {
    PostItem
  },
  computed: {
    posts() {
      return [
        {
          id: 1,
          title: "Bai so 1",
          ex: "Mota 1"
        },
        {
          id: 2,
          title: "Bai so 2",
          ex: "Mota 2"
        }
      ];
    }
  }
};
</script>


<style scoped>

</style>
