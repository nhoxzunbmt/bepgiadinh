<template>
    <div v-if="isShowNavbar">
        <app-navbar></app-navbar>
        <app-search></app-search>
    </div>
</template>

<script>
import Search from "@/components/header/search";
import Navbar from "@/components/header/navbar";
export default {
  components: {
    AppSearch: Search,
    AppNavbar: Navbar
  },
  computed: {
    isShowNavbar() {
      return this.$store.getters.isShowNavbar;
    }
  },
};
</script>

<style scoped>
.header {
  display: block;
  float: left;
  width: 100%;
  background-color: red;
}
</style>