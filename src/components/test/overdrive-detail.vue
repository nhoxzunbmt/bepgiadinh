<template>
  <transition name="fade">
    <header class="bg-grey-lighter border-b flex items-center justify-center flex-col">
      <overdrive :id="library.slug" @animation-end="handleAnimEnd">
        <div class="lib-tile w-24 h-24 rounded-full border mr-auto ml-auto" :style="calcBackground(library)"></div>
      </overdrive>
      <transition name="slide-fade" @after-leave="handleLeave">
        <div v-show="loaded" class="text-center">
          <h1 class="font-normal text-lg mt-4 font-medium mb-3">{{ library.name }}</h1>
          <button class="text-blue text-sm" @click="goBack">Back</button>
        </div>
      </transition>
    </header>
  </transition>
</template>

<script>
export default {
  name: "character-detail",
  data() {
    return {
      loaded: false,
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
  computed: {
    library() {
      return this.getLibBySlug(this.$route.params.slug);
    }
  },
  methods: {
    calcBackground(library) {
      return {
        backgroundImage: `url(/static/${library.image})`
      };
    },
    goBack() {
      this.loaded = false;
    },
    handleLeave() {
      this.$router.push("/libraries");
    },
    handleAnimEnd() {
      this.loaded = true;
    },
    getLibBySlug(slug) {

      const lib = this.libraries.find(s => s.slug === slug);
              console.log('getLibBySluggetLibBySluggetLibBySluggetLibBySluggetLibBySlug',slug,lib)
      return lib;
    }
  }
};
</script>

<style>
header {
  height: 280px;
}

.lib-tile {
  background-color: white;
  background-size: 70%;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>
