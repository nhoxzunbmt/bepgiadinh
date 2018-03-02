<template>
    <div class="btn_love">
        <a href="#" @click.prevent="lovePost" :class="loved" class="pull-left">Love</a>
    </div>
</template>

<script>
export default {
  props: {
    post_id: {
      type: Number
    }
  },
  data() {
    return {
      isLove: false
    };
  },
  computed: {
    loved() {
      return this.isLove == true ? "loved" : "";
    }
  },
  methods: {
    lovePost() {
      this.isLove = true;
      this.$store.dispatch("lovePost", this.post_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.btn_love {
  display: block;
  margin: 0 auto;
}
.loved {
  color: red;
}
</style>