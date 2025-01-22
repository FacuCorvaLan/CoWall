<template>
<div class="containerProfile">
  <NavbarCw/>
  <div class="containerWallet"><myWallet/></div>
  <WebFooter/> 
</div>
</template>

<script>
import NavbarCw from '../Components/NavbarCw.vue';
import myWallet from '../Components/myWallet.vue';
import WebFooter from '../Components/WebFooter.vue';

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet,
    WebFooter
  },
}
</script>

<style>
  .containerProfile{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }
  .containerWallet{
    display: flex;
    justify-content: center;
    padding: 100px 10px 30px 10px;
  }
</style>