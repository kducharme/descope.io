<template>
  <header>
    <nav class="nav">
      <div class="nav__left">
        <p>Logo here</p>
      </div>
      <div class="nav__right">
        <router-link class="nav__link" :to="{ name: 'Home' }">Home</router-link>
        <router-link class="nav__link" :to="{ name: 'Register' }">Create</router-link>
        <router-link class="nav__link" :to="{ name: 'Login' }">Login</router-link>
        <section>Logout</section>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    // Get user from store

    // Setup ref to router

    // Logout function

    return {};
  },
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  justify-content: space-between;
  height: 72px;
  padding: 0 24px;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px !important;
  background: white;
  .nav__left,
  .nav__right {
    display: flex;
    align-items: center;
    width: 50%;
  }
  .nav__right {
    justify-content: flex-end;
  }
  .nav__link {
    padding: 0 12px;
  }
}
</style>
