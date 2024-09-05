<template>
  <InitialPage/>
</template>

<script>
import InitialPage from "../src/components/InitialPage.vue"
export default {
  name: 'App',
  components: {
    InitialPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
