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
<form @submit.prevent="validateBeforeSubmit">
    <div class="column is-12">
        <label class="label">Email</label>
        <p class="control has-icon has-icon-right">
            <input name="email" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
            <i v-show="errors.has('email')" class="fa fa-warning"></i>
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
    </div>
    <div class="column is-12">
        <label class="label">Name</label>
        <p class="control has-icon has-icon-right">
            <input name="name" v-model="name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Name">
            <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
    </div>
    <div class="column is-12">
        <label class="label">Phone</label>
        <p class="control has-icon has-icon-right">
            <input name="phone" v-model="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('phone') }" type="text" placeholder="Phone">
            <i v-show="errors.has('phone')" class="fa fa-warning"></i>
            <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
        </p>
    </div>
    <div class="column is-12">
        <label class="label">Website</label>
        <p class="control has-icon has-icon-right">
            <input name="url" v-model="url" v-validate="'required|url'" :class="{'input': true, 'is-danger': errors.has('url') }" type="text" placeholder="Website">
            <i v-show="errors.has('url')" class="fa fa-warning"></i>
            <span v-show="errors.has('url')" class="help is-danger">{{ errors.first('url') }}</span>
        </p>
    </div>

    <div class="column is-12">
        <p class="control">
            <button class="button is-primary" type="submit">Submit</button>
        </p>
    </div>
</form>
   
        {{ user }}
        <br>
        <textarea v-model="message" placeholder="add multiple lines" width="100%" v-validate="'required'"></textarea>
        <span v-show="errors.has('email')">{{ errors.first('email') }}</span>
        <p class="control has-icon has-icon-right">
            <input name="email" v-model="email" v-validate.initial="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
            <i v-show="errors.has('email')" class="fa fa-warning"></i>
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
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
      message: "",
    email: '',
    name: '',
    phone: '',
    url: ''
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
    },
        validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          alert('Form Submitted!');
          return;
        }

        alert('Correct them errors!');
      });
    }
  }
};
</script>

<style scoped>

</style>