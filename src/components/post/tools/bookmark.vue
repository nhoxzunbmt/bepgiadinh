<template>
    <div>
        <a href="#" @click.prevent="bookmarkPost" :class="bookmarkd">Bookmark</a>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isbookmark: false
    };
  },
  computed: {
    bookmarkd() {
      return this.isbookmark == true ? "bookmarkd" : "";
    }
  },
  methods: {
    bookmarkPost() {
      this.isbookmark = true;
      alert('bookmarkd')
    }
  }
};
</script>

<style lang="scss" scoped>
.bookmarkd {
  color: red;
}
</style>