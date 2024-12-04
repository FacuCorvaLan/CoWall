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
//import eventServices from "../Services/EventService.js"

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet,
    boxCrypto
  },

  data() {
    return {
      events: null,
    }
  },

  /*created() {
    eventServices.getEvents()
    .then(response =>{
      this.events = response.data;
    })
    .catch(error =>{
      console.log(error);
    })
  },*/
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