<template>


   <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 v-for="cat in categories" :key="cat.id">
         <post-item :posts="posts"></post-item>
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

</style>
