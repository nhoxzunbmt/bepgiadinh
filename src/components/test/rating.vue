<template>
    <div>
        <content-placeholders :rounded="false">
        <content-placeholders-heading :img="true" />
        <content-placeholders-text :lines="3" />
        </content-placeholders>
    </div>
</template>

<script>

export default {

  data() {
    return {
      yourLocalVariable: 0
    };
  }
};
</script>

<style scoped>

</style>