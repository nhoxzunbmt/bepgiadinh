<template>
    <div>
      <swiper :options="options">
        <swiper-slide v-for="post in posts" :key="post.id" >
            <div class="swiper_item">
                <img class="img" src="https://lh3.googleusercontent.com/BKFZKfyH5pAM6AFHXzu2tNuseoMrIkLwyS1Qp5HWX9dXegzbZUIUtwMwzruJPneDOewEyBkFh4pqpLaPQ7qg8kU=s320-c-e365" alt="">
                <!-- <div class="title">
                Easiest Apple Crumble.
                </div> -->
            </div>
                         
        </swiper-slide>
        <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      </swiper>
    </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      require: true,
      default: function() {
        return null;
      }
    },
    options: {
      type: Object,
      require: true,
      default: function() {
        return null;
      }
    }
  },
  methods: {
      getWidth(index){
          return index % 2 == 0  ? '250px' : '180px'
      }
  }
};
</script>

<style lang="scss" scoped>
 .swiper_item{
 
     .img{
    width:300px;
     }
 }

   .swiper-slide {
    width: 80%;
  }
  .swiper-slide:nth-child(2n) {
    width: 60%;
  }
  .swiper-slide:nth-child(3n) {
    width: 40%;
  }
</style>