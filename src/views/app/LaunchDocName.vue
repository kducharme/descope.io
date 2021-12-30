<template>
  <div class="body">
    <h1 class="doc__name" contenteditable="true">
      {{ name }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "LaunchDocName",
  props: {
    name: {
      type: String,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
</style>
