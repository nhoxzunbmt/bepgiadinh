<template>

    <div class="row">
        <button @click="increase">Add</button>
        <p>{{ counter }}</p>
      </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Analytics',
  computed: {
    ...mapGetters([
      'counter'
    ])
  },
  methods: {
    ...mapActions([
      'increase'
    ])
  }
};
</script>

<style scoped>

</style>