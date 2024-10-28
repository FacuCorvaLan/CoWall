<template>
<div>
  <navbarCw/>
  <myWallet/>
</div>
</template>

<script>
import navbarCw from "../components/NavbarCw.vue";
import myWallet from "../components/myWallet.vue"

export default {

  components: {
    navbarCw,
    myWallet
  }
}
</script>