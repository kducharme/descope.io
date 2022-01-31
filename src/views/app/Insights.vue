<template>
  <div class="overview">
    <span>
      I am the insights page
    </span>
  </div>
</template>

<script>
import store from "../../store/index";
export default {
  name: "Insights",
  setup() {
    return {store};
  },
};
</script>

<style lang="scss" scoped>
.overview {
  background: #eeeff3;
  height: calc(100vh - 102px);
  padding: 24px;
}
</style>
