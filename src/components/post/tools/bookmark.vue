<template>
    <div class="btn_bookmark">
        <a href="#" @click.prevent="bookmarkPost" :class="bookmarkd" class="pull-left">Bookmark</a>
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
      return this.isbookmark == true ? "bookmark" : "";
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
.btn_bookmark{
     display: block;
    float:left;
}
.bookmark {
  color: red;

}
</style>