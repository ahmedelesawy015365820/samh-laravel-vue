<template>
<div id="app">
    <router-view />
</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/checkAuth');
  }
}
</script>
