<template>
  <div>
    <scale-transition v-for="item in items" :key="item"> 
      <div class="box" v-show="show">
        <p>Fade transition + {{ item }}</p>
      </div>
    </scale-transition>
    <a href="#" @click.prevent="addFade">Click</a>
  </div>
</template>

<script>


import { FadeTransition } from "vue2-transitions";
import { ScaleTransition } from 'vue2-transitions'

export default {
  components: {
    FadeTransition
  },
  data() {
    return {
      show: true,
      items: [
          1,
          2,
          3
      ]
    }
  },
  methods:{
      addFade(){
          const next = this.items.length + 1;
          this.items.push(next)
      }
  }
};
</script>

<style scoped>
    .box{
        width: 200px;
        height: 200px;
        display: block;
        background-color: aqua;
        float:left;
    }
</style>