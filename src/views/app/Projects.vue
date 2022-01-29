<template>
  <div class="body">
    <span v-for="proj in store.state.projects" :key="proj.id">
      {{ project.name }}
    </span>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Projects",
  setup() {
    return {store};
  },
};
</script>

<style lang="scss" scoped>
</style>
