<template>
<div class="items_post">
  <div v-for="post in posts" :key="post.id">

    <router-link :to="{ name: 'Post', params: { id: post.id }}" tag="a" v-html="post.title.rendered" class="title"></router-link>

    <router-link :to="{ name: 'Post', params: { id: post.id }}" :title="post.title.rendered">
        <b-img :src="getFeaturedImage(post)" fluid :alt="post.title.rendered"/>
    </router-link>

    <p v-html="getExcerpt(post)"></p>

  </div>
</div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    posts: {
      type: Array,
      require: true,
      default: function() {
        return [];
      }
    }
  },
  methods: {
    getExcerpt: function(post) {
      if (_.isUndefined(post.excerpt.rendered))
        return "";
      return _.truncate(post.excerpt.rendered, {
        length: 120
      });
    },
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
  .items_post{
    margin-bottom: 60px;
    a{
      display: block;
    }
    .title{
      color:#a92929;
      font-weight: bold;
      font-size: 24px;
      padding-bottom: 48px;
    }
  }
</style>
