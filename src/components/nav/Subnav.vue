<template>
  <header>
    <nav class="subnav">
      <div class="subnav__left">I am the subnav</div>
      <div class="subnav__right">
        <!-- <BaseButton :type="type" :text="text" :action="action" /> -->
      </div>
    </nav>
  </header>
</template>

<script>
// import BaseButton from "../global/BaseButton.vue";

export default {
  components: {
    // BaseButton,
  },
  data() {
    return {};
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.subnav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  width: calc(100vw - 260px);
  background: #1e1f21;
  padding: 0 16px;
  border-bottom: 0.5px solid #e2e2e25f;
  .subnav__left,
  .subnav__right {
    width: 50%;
  }
  .subnav__right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
