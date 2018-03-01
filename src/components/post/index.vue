<template>
    <div class="post_detail">
        <div>
         <app-back></app-back>
         <app-bookmark></app-bookmark>
         <app-love v-if="post" :post_id="post.id"></app-love>
        </div>

        <div class="content" v-if="post">
            <b-img :src="getFeaturedImage(post)" fluid/>

            {{ post.title.rendered }}

            <app-stars></app-stars>



            <h2>Nguyên liệu</h2>
            <div v-html="post.custom_fields.nguyen_lieu">

            </div>
              <h2>Cách làm</h2>
            <!-- <div class="content" v-html="post.content.rendered">
            </div> -->
            <h2>Bình luận</h2>
            <app-comment :comment_post_ID="post.id"></app-comment>

            <app-login></app-login>
            
        </div>

 
        
    </div>
</template>

<script>
import Back from "@/components/post/tools/back";
import Bookmark from "@/components/post/tools/bookmark";
import Love from "@/components/post/tools/love";
import Stars from "@/components/post/tools/stars";
import Comment from '@/components/post/tools/comment';
import Login from '@/components/login';
export default {
  components: {
    AppBack: Back,
    AppLove: Love,
    AppBookmark: Bookmark,
    AppStars: Stars,
    AppComment: Comment,
    AppLogin : Login
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    post() {
      return this.$store.getters.post;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  created() {
    this.$store.dispatch("getPost", this.$route.params.id);
    this.$store.dispatch("hideNavbar", true);
  },
  methods: {
    getFeaturedImage: function(post) {
      return "";
      if (
        typeof post.better_featured_image.media_details.sizes.featured ==
        "undefined"
      )
        return "";
      return post.better_featured_image.media_details.sizes.featured.source_url;
    }
  }
};
</script>

<style lang="scss" scoped>
.post_detail {
  .content {
    img {
      max-width: 100% !important;
      height: auto;
    }
  }
}
</style>