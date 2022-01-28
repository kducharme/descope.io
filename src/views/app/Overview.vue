<template>
  <div class="body">
    <span>
      I am the overview page
    </span>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Overview",
  setup() {
    return {store};
  },
};
</script>

<style lang="scss" scoped>
</style>
