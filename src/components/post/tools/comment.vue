<template>
    <div>

    <div class="container" v-if="comments">
        <div class="row" v-for="comment in comments" :key="comment.id">
            <div class="comments col-md-9" id="comments">
                <!-- <h3 class="mb-2">Comments</h3> -->
                <!-- comment -->
                <div class="comment mb-2 row">

                  <comment-item :comment="comment"></comment-item>
 
                    
                    <!-- reply is indented -->
                    <!-- <div class="comment-reply col-md-11 offset-md-1 col-sm-10 offset-sm-2">
                              <div class="row">
                            <comment-item></comment-item>
                                    </div>
                  </div> -->
                  <!-- /reply is indented -->
                </div>
                <!-- /comment -->

        

            </div>
        </div>
    </div>

   
        {{ user }}
        <br>
        <textarea v-model="message" placeholder="add multiple lines" width="100%"></textarea>
        <br>
        <button type="submit" @click.prevent="comment">Submit</button>
    </div>
</template>

<script>

import CommentItem from '@/components/post/tools/comment-item';
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
  components :{
    CommentItem
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