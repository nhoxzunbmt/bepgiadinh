<template>
    <div>
    <vue-dropzone ref="myVueDropzone" id="dropzone" v-on:vdropzone-sending="sendingEvent" :options="dropzoneOptions">
    </vue-dropzone>
    </div>
</template>

<script>

//https://github.com/rowanwins/vue-dropzone
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data: function () {
    return {
      dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          headers: { "My-Awesome-Header": "header value" }
      }
    }
  },
  methods: {
    sendingEvent(file, xhr, formData) {
      formData.append("paramName", "some value or other");
    }
  }
};
</script>

<style scoped>

</style>