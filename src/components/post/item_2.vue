<template>
      <div v-if="post" class="recipe-card single-recipe">

              <vue-star animate="animated bounceIn" color="#F05654">
    <i slot="icon" class="fa fa-heart">1</i>
  </vue-star>
            <!-- <img class="recipe-card-img" src="https://lh3.ggpht.com/kiCyWmZBMmZh3PSD6Q5wDQxZekEMZ6bymz8dAR-rSIRhzDa6zojGYE7gBRuT_oKbgaFUQ4QMMMD1JcrDdOnCblY=s2-c-e365" alt="Avocado, Tomato, Edamame, and Red Onion Salad with Cumin-Lime Vinaigrette." height="320px">
            <img class="recipe-card-img full-size" :src="getFeaturedImage(post)" alt="Avocado, Tomato, Edamame, and Red Onion Salad with Cumin-Lime Vinaigrette.">
            <div class="card-gradient"></div>
            <div class="card-info"><h2 class="card-title">

   <router-link :to="{ name: 'Post', params: { id: post.id }}" tag="a" v-html="post.title.rendered" class="title"></router-link>
            </h2><h3 class="card-source"><a class="source-link" href="/page/skinny-ms">Skinny Ms</a></h3>
            <p class="card-ingredients">
              <a href="/#recipe/Cleanse-_-Detox-Smoothie-2211447">celery ribs, lemon, ground flaxseed, kale, kale, apples, cold water and <span class="ingredient-more-count" data-popup="">4 more </span></a>
            </p>
              </div>

<div class="yum-block">
  <div class="btn-yum btn-wrapper yum-click">


    <span class="yum"></span><span class="count">11k</span></div></div>
         -->
        </div>
</template>

<script>
import _ from "lodash";
import { methods } from "@/utils";
import VueStar from 'vue-star'

export default {
  components: {
    VueStar
  },
  props: {
    post: {
      type: Object,
      require: true,
      default: function() {
        return null;
      }
    }
  },
  methods: {
    getExcerpt: function(post) {
      if (_.isUndefined(post.excerpt.rendered)) return "";
      return _.truncate(post.excerpt.rendered, {
        length: 120
      });
    },
    getFeaturedImage: function(post) {
      return 'https://lh3.googleusercontent.com/BKFZKfyH5pAM6AFHXzu2tNuseoMrIkLwyS1Qp5HWX9dXegzbZUIUtwMwzruJPneDOewEyBkFh4pqpLaPQ7qg8kU=s320-c-e365';
      if (
        typeof post.better_featured_image.media_details.sizes.featured ==
        "undefined"
      )
        return "";
      return post.better_featured_image.media_details.sizes.featured.source_url;
    },
       handleClick () {
      //do something
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: inherit;
  text-decoration: none;
}

.recipe-card {
  position: relative;
  cursor: pointer;
  background-color: #232323;
}
.recipe-card .card-gradient {
  top: auto;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: all 0.6s ease;
  transform-origin: bottom center;
}
.recipe-card .card-gradient,
.recipe-card .image-overlay {
  position: absolute;
  right: 0;
  left: auto;
  width: 100%;
  height: 100%;
}
.recipe-card.single-recipe .card-gradient {
  background: none;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 15%,
    transparent 50%
  );
}
.recipe-card .recipe-card-img {
  width: 100%;
  height: 100%;
  transition: transform 1.2s ease, opacity 0.4s ease;
}
.recipe-card .recipe-card-img.full-size {
  position: absolute;
  top: 0;
  right: 0;
  bottom: auto;
  left: auto;
  transform: scale(1);
}
.recipe-card .card-info {
  position: absolute;
  bottom: 5%;
  left: 5%;
  color: #fff;
  width: 66.6667%;
}
.recipe-card .card-info .card-title {
  font-size: 18px;
  line-height: 1.25;
  font-weight: 400;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recipe-card a {
  display: block;
  height: 100%;
  width: 100%;
}
.recipe-card .card-info .card-source {
  font-size: 12px;
  line-height: 18px;
  padding: 7px 0 5px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.recipe-card a {
  display: block;
  height: 100%;
  width: 100%;
}
.recipe-card .card-info .card-ingredients {
  color: #e0ddd2;
  font-size: 13px;
  font-weight: 400;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  line-height: 18px;
  transition: max-height 0.8s ease, opacity 1.2s ease;
  text-shadow: 0 1px 2px #000, 0 0 0;
}
.recipe-card .card-info .card-ingredients,
.recipe-card.selected .card-info .card-ingredients {
  max-height: 4.153846153846154em;
  opacity: 1;
}
.recipe-card .image-overlay {
  top: 0;
  bottom: auto;
  opacity: 0;
  z-index: 5;
}
.btn-yum {
    cursor: pointer;
    font-size: 17px;
    width: 4em;
    right: 5%;
    bottom: 5%;
}
.btn-yum, .btn-yum .count, .btn-yum .yum {
    height: 3em;
    position: absolute;
    top: auto;
    left: auto;
}
.btn-yum .count, .btn-yum .yum {
    background: #e16120 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABMCAMAAADwSaEZAAACNFBMV…eAxfX0WhU+Y4Eh8amny7XX8k9LDRtNaUxjGtOYxjSmMfX6DQ8bWRe25h2dAAAAAElFTkSuQmCC) 50% no-repeat;
    background-size: 90%;
    border-radius: 4em;
    line-height: 1;
    margin: 0 1em;
    right: 0;
    bottom: 0;
    transition: transform .8s ease;
    transform: rotate(0turn);
    width: 3em;
    z-index: 10;
}
.btn-yum .count {
    font-family: Raleway,Roboto,Helvetica Neue,Segoe UI,sans-serif;
    font-weight: 700;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-family: sans-serif;
    font-weight: inherit;
    background: #fff;
    color: #777;
    font-size: .618em;
    line-height: 3;
    margin: 0;
    text-align: center;
    z-index: 2;
    right: -6px;
}
</style>