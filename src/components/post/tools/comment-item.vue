<template>
    <div>
      
                                    <div class="comment-avatar col-md-1 col-sm-2 text-center pr-1">
                                        <a href=""><img class="mx-auto rounded-circle img-fluid" src="http://demos.themes.guide/bodeo/assets/images/users/m101.jpg" alt="avatar"></a>
                                    </div>
                                    <div class="comment-content col-md-11 col-sm-10 col-12">
                                        <h6 class="small comment-meta"><a href="#">{{ comment.author_name }}</a> comment.date</h6>
                                        <div class="comment-body">
                                            <p v-html="comment.content.rendered">      </p>
                                                <!-- <br>
                                                <a href="" class="text-right small"><i class="ion-reply"></i> Reply</a> -->
                                      
                                        </div>
                                    </div>
                                </div>

</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      require: true,
      default: function() {
        return {};
      }
    }
  }
};
</script>

<style scoped>

</style>