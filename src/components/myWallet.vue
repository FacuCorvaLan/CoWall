<template>
  <div class="containerSec">
  <div class="walletCw">
    <section class="firstColumn">
      <h1>Mi Billetera</h1>
      <section class="userAmount">
        <div class="amount"><p>Monto Total: $145.000</p><div class="showAmount">a</div></div>
        <input class="btnBuySell" type="button" @click="this.$router.push('/tranding')" value="Comprar/Vender"/>
      </section>
    </section>
    <section class="secondColumn">
      <h2>Últimos movimientos</h2>
      <ul class="lastMov">
        <li class="MovBox">{{  }} de {{  }}</li>
      </ul>
      <div class="linkRecord" @click="openRecord"><p>Ver mi historial</p></div>
    </section>
  </div>
</div>
</template>

<script>
export default {

  data() {
    return {
      events: {},
    }
  },

  methods: {
    openRecord(){
      this.$router.push('/history');
    }
  }
}
</script>

<style>
.containerSec{
display: flex;
flex-direction: column;
}

.walletCw{
  margin: 15px;
  display: flex;
  justify-content: center;
  gap: 30px;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  max-width: fit-content;
  height: 200px;
  border-color: rgb(24, 174, 246);
  border-style: solid;
  border-radius: 25px;
  border-width: 2px;
}

.firstColumn{
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.firstColumn h1{
  font-size: 45px;
  margin-top: 0;
  margin-bottom: 1px;
}

.firstColumn p{
  font-size: 20px;
  margin: 10px 0;
}

.userAmount{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.amount{
  display: flex;
  align-items: center;
  gap: 10px;
}

.btnBuySell{
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-weight: bolder;
  max-width: fit-content;
  font-size: 16px;
  height: 40px;
  background-color: transparent;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
}

.btnBuySell:active {
  background-color: rgb(24, 174, 246);
  color: white; 
}

.secondColumn{
  background-color: blue;
  color: white;
  padding: 20px; 
  border-radius: 25px;
}

.secondColumn h2{
  font-size: 25px;
  font-weight: lighter;
  margin-top: 0;
}

.linkRecord{
  display: flex;
  justify-content: flex-end;
  font-size: 14px;
}

.lastMov{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
}

.lastMov li{
  list-style: none;
}

</style>