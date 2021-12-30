<template>
  <div class="body">
    <span class="body__content body__placeholder" contenteditable="true">
      {{ body }}
    </span>
  </div>
</template>

<script>
export default {
  name: "LaunchDocBody",
  props: {
    body: {
      type: String,
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped>
.body__content {
  cursor: text;
}

.body__placeholder::before {
  content: "Start writing your master plan";
  position: absolute;
}

.body__placeholdert::after {
  content: "";
  width: 0;
  height: 0;
}
</style>
