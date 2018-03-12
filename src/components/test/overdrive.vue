<template>
  <div class="items-center justify-center h-full">
    <ul class="list-reset">
      <li class="inline-block mr-8" v-for="(library, index) in libraries" :key="index">
        <overdrive :id="library.slug">
            {{ library.name }}
          <router-link :to="calcLink(library)">
            <div class="lib-tile w-24 h-24 rounded-full border hover:border-grey" :style="calcBackground(library)"></div>
          </router-link>
        </overdrive>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "character-index",
  data() {
    return {
      characters: [],
      libraries: [
        {
          name: "Vue.js",
          slug: "vue",
          image: "vue.png"
        },
        {
          name: "React",
          slug: "react",
          image: "react.png"
        },
        {
          name: "Ember",
          slug: "ember",
          image: "ember.png"
        }
      ]
    };
  },
  methods: {
    calcLink(library) {
      return `/overdive-detail/${library.slug}`;
    },
    calcBackground(library) {
      return {
        backgroundImage: `url(/static/${library.image})`
      };
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 768px;
  margin: 0 auto;
}

.lib-tile {
  background-size: 70%;
  background-position: center center;
  background-repeat: no-repeat;
}

.rounded-full{
    width: 200px;
    height: 200px;
    display: block;
}
</style>
