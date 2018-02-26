<template>
    <div class="post_detail">
        <div>
         <app-back></app-back>
         <app-bookmark></app-bookmark>
         <app-love></app-love>
        </div>
        Post - {{ post.title }}

        <div class="content">

        </div>
        <app-stars></app-stars>
    </div>
</template>

<script>
import Back from "@/components/post/tools/back";
import Bookmark from "@/components/post/tools/bookmark";
import Love from "@/components/post/tools/love";
import Stars from "@/components/post/tools/stars";
export default {
  components: {
    AppBack: Back,
    AppLove: Love,
    AppBookmark: Bookmark,
    AppStars: Stars
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
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
    },
    post() {
      return this.posts.find(elm => elm.id == this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.post_detail {
  .content {
    height:1200px;
    background-color:red;
  }
}
</style>