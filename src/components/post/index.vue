<template>
    <div class="post_detail">
        <div>
         <app-back></app-back>
         <app-bookmark></app-bookmark>
         <app-love :post_id="post.id"></app-love>
        </div>

        <div class="content" v-if="show_post">
            <b-img :src="getFeaturedImage(post)" fluid/>

            {{ post.title.rendered }}

            <app-stars></app-stars>

            <!-- <div class="content" v-html="post.content.rendered">
            </div> -->
        </div>

 
        
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
    //   data: function() {
    //     return {
    //         post: {
    //           title : {
    //             rendered : null
    //           }
    //         },
 
    //     };
    // },
  computed: {
    id() {
      return this.$route.params.id;
    },
    post() {
         return this.$store.getters.post;
    },
    show_post(){
      return this.$store.getters.show_post;
    }
  },
  created() {
      this.$store.dispatch("getPost",this.$route.params.id);
      this.$store.dispatch("hideNavbar",true);
  },
  methods: {
    getFeaturedImage: function(post) {
      return "";
      if (typeof post.better_featured_image.media_details.sizes.featured == 'undefined')
        return "";
      return post.better_featured_image.media_details.sizes.featured.source_url;
    }
  }
};
</script>

<style lang="scss" scoped>
.post_detail {
  .content {
    img{
      max-width: 100% !important;
      height: auto;
    }

  }
}
</style>