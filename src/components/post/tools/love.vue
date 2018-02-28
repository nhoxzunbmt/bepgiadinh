<template>
    <div>
        <a href="#" @click.prevent="lovePost" :class="loved">Love</a>
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
.loved {
  color: red;
}
</style>