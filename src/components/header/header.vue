<template>
    <div>
        <p class="header">Header</p>

        <app-search></app-search>
    </div>
</template>

<script>
import Search from "@/components/header/search";
export default {
  components: {
    AppSearch: Search
  }
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