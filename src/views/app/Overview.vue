<template>
  <div class="overview">
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
.overview {
  background: #eeeff3;
  height: calc(100vh - 100px);
}
</style>
