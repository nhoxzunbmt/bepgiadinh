<template>
    <div>
    <div class="ax"
        style="height: 1200px;background-color: #ccc;width: 400px;margin: 0 auto;"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10">
    </div>
    </div>
</template>

<script>
export default {
  data: function() {
    return { busy: false };
  },
  methods: {
    loadMore: function() {
      var self = this;
      self.busy = true;
      console.log("loading... " + new Date());
      setTimeout(function() {
        var app = document.querySelector(".app");
        var height = app.clientHeight;
        app.style.height = height + 300 + "px";
        console.log("end... " + new Date());
        self.busy = false;
      }, 1000);
    }
  }
};
</script>

<style scoped>

</style>