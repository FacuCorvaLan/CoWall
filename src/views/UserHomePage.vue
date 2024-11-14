<template>
<div class="containerProfile">
  <NavbarCw/>
  <myWallet/>
</div>
</template>

<script>
import NavbarCw from "../components/NavbarCw.vue";
import myWallet from "../components/myWallet.vue"

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet
  }
}
</script>

<style>
  .containerProfile{
    display: flex;
    justify-content: space-around;
    padding: 100px 10px;
  }
</style>