<template>
    <div>
        <ul v-if="comments">
            <li v-for="comment in comments" :key="comment.id">
                <div v-html="comment.content.rendered"></div>
            </li>
        </ul>
        <br>
        {{ user }}
        <br>
        <textarea v-model="message" placeholder="add multiple lines" width="100%"></textarea>
        <br>
        <button type="submit" @click.prevent="comment">Submit</button>
    </div>
</template>

<script>
export default {
  props: {
    comment_post_ID: {
      type: Number,
      require: true,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      message: ""
    };
  },
  computed: {
    comments() {
      return this.$store.getters.comments;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    const payload = {
      post_id: this.comment_post_ID
    };
    this.$store.dispatch("getComments", payload);

    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    comment() {
      const payload_comment = {
        content: this.message,
        post: this.comment_post_ID,
        token: this.user.token
      };
      console.log(payload_comment);
      this.$store.dispatch("addComment", payload_comment);
      //this.reset();
    },
    reset() {
      this.message = "";
    }
  }
};
</script>

<style scoped>

</style>