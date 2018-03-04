<template>
      <div class="post_detail">

 
 

      <item-swiper :options="swiperOption" :posts="posts">
  
      </item-swiper>
  
    </div>
</template>

<script>
import Back from "@/components/post/tools/back";
import Bookmark from "@/components/post/tools/bookmark";
import Love from "@/components/post/tools/love";
import Stars from "@/components/post/tools/stars";
import Comment from '@/components/post/tools/comment';
import Login from '@/components/login';
import ItemSwiper from '@/components/post/item_swiper'

import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    AppBack: Back,
    AppLove: Love,
    AppBookmark: Bookmark,
    AppStars: Stars,
    AppComment: Comment,
    AppLogin : Login,
        swiper,
    swiperSlide,
    ItemSwiper : ItemSwiper
  },

  computed: {
    id() {
      return this.$route.params.id;
    },
    post() {
      return this.$store.getters.post;
    },
        posts() {
      return this.$store.getters.posts;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },
    swiperOption(){
        return {
          slidesPerView: 2,
          spaceBetween: 0,
          centeredSlides: false,
            slidesPerView: 'auto',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        };
    }
  },
  created() {
    this.$store.dispatch("getPosts");
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