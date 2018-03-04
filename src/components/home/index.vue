<template>

   <v-container class="post_full_width">
   <v-layout row wrap>
      <v-flex xs12 sm6 v-for="post in posts" :key="post.id">
         <post-item :post="post"></post-item>
      </v-flex>
        <!-- <div class="home">
  
       
        <ul>
          <li v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </li>
        </ul>


      <a href="#" @click="loadMore">Load More</a>
  </div> -->
    </v-layout>
  </v-container>

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
