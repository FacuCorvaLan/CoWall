<template>
<div class="containerProfile">
  <NavbarCw/>
  <myWallet/>
  <boxCrypto/>
</div>
</template>

<script>
import NavbarCw from '../Components/NavbarCw.vue';
import myWallet from "../Components/myWallet.vue";
import boxCrypto from "../Components/boxCryptos.vue";

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet,
    boxCrypto
  },
}
</script>

<style>
  .containerProfile{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 100px 10px;
  }
</style>