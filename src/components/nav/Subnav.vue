<template>
  <header>
    <nav class="subnav">
      <div class="top">
        <h2 class="title">{{ props.name }}</h2>
      </div>
      <div class="bottom">Links</div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    name: {
      type: String,
    },
  },
  setup(props) {

    return { props };
  },
};
</script>

<style lang="scss" scoped>
.subnav {
  display: flex;
  flex-direction: column;
  width: calc(100vw - 260px);
  padding: 16px 24px;
  border-bottom: 0.5px solid #e2e2e25f;
  .top {
    display: flex;
    margin: 0 0 12px;
    .title {
      height: 24px;
      font-size: 16px;
      font-weight: 800;
    }
  }
}
</style>
