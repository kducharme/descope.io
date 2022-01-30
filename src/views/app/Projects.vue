<template>
  <div class="projects">
    <span v-for="project in store.state.projects" :key="project.id">
      {{ project.name }}
    </span>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Projects",
  setup() {

    return { store };
  },
};
</script>

<style lang="scss" scoped>
.projects {
  background: #eeeff3;
  height: calc(100vh - 100px);
}
</style>
