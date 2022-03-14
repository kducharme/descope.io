<template>
  <div class="overview">
    <span>
      I am the team settings page
    </span>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Team Settings",
  setup() {
    return {store};
  },
};
</script>

<style lang="scss" scoped>
.overview {
  background: #f1f3f7;
  height: calc(100vh - 102px);
  padding: 24px;
}
</style>
