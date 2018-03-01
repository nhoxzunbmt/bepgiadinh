<template>
    
    <div>
        <input type="text" v-model="username">
        <br>
        <input type="text" v-model="password">
        <br>
        <button type="submit" @click.prevent="login">Submit</button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      username: "thanhloi@ringier.com.vn",
      password: "530825"
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    login() {
      const payload_comment = {
        content: this.message,
        post: this.comment_post_ID
      };
      console.log(payload_comment)
      this.$store.dispatch("login", payload_comment);

    },
    reset() {

    }
  }
};
</script>

<style scoped>

</style>