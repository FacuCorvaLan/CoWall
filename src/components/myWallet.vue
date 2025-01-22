<template>
  <div class="containerSec">
  <div class="walletCw">
    <section class="firstColumn">
      <h1>Mi Billetera</h1>
      <section class="userAmount">
        <div class="amount"><p>Monto Total: $145.000</p><div class="showAmount">a</div></div>
        <div class="graphicDiv"><chartGraphic/></div>
      </section>
    </section>
    <section class="secondColumn">
      <h1>Precios de las Criptomonedas</h1>
      <div class="tblCriptoPrices">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Símbolo</th>
              <th>Precio (USD)</th>
              <th>Cambio (24h)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Bitcoin</td>
              <td>BTC</td>
              <td>$42,345.67</td>
              <td style="color: rgb(5, 252, 5);">+2.34%</td>
            </tr>
            <tr>
              <td>Ethereum</td>
              <td>ETH</td>
              <td>$2,932.45</td>
              <td style="color: rgb(5, 252, 5);">+1.12%</td>
            </tr>
            <tr>
              <td>Tether</td>
              <td>USDT</td>
              <td>$1.00</td>
              <td style="color: rgb(5, 252, 5);">+0.01%</td>
            </tr>
            <tr>
              <td>DogeCoin</td>
              <td>DOGE</td>
              <td>$0.23</td>
              <td style="color: rgb(255, 98, 98);">-0.56%</td>
            </tr>
            <tr>
              <td>Solana</td>
              <td>SOL</td>
              <td>$123.45</td>
              <td style="color: rgb(5, 252, 5);">+5.67%</td>
            </tr>
            <tr>
              <td>Avalanche</td>
              <td>AVAX</td>
              <td>$89.34</td>
              <td style="color: rgb(5, 252, 5);">+3.45%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="actionsBtn">
        <input class="btnBuySell" type="button" @click="this.$router.push('/tranding')" value="Comprar/Vender"/>
        <div class="linkRecord" @click="openRecord"><p>Ver mi historial</p></div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
import chartGraphic from '../Components/doughnutGraphic.vue';
export default {
  components: {
    chartGraphic,
  },
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

<style scoped>
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
  max-height: fit-content;
  border-width: 2px;
  border-radius: 28px;
  border-style: solid;
  border-color:rgb(24, 174, 246);
}

.firstColumn{
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px 10px;
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
}

.amount{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.graphicDiv{
  display: flex;
  z-index: 1;
}

.secondColumn{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: blue;
  color: white;
  padding: 20px; 
  border-radius: 25px;
}

.secondColumn h1{
  font-size: 30px;
  font-weight: bolder;
  margin-top: 0;
}

.tblCriptoPrices {
  display: flex;
  width: 90%;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

thead {
  background-color: blue;
  color: white;
}

th, td {
  padding: 12px 15px;
  border: 1px solid rgb(24, 174, 246);
}

.actionsBtn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 388px;
  margin-top: 30px;
  gap: 30px;
}

.btnBuySell{
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  font-weight: bolder;
  max-width: fit-content;
  font-size: 16px;
  height: 40px;
  background-color: white;
  border-color: rgb(24, 174, 246);
  border-radius: 18px;
  border-style: solid;
  transition: background-color 0.5s; 
  box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.btnBuySell:active {
  background-color: rgb(24, 174, 246);
  color: white; 
}

.linkRecord{
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
}

.linkRecord p {
  position: relative;
  margin-bottom: 0;
  font-size: 15px;
  display: inline-block;
  color: white;
  text-decoration: none;
}

.linkRecord p::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: white;
  transition: width 0.3s ease-out;
}

.linkRecord p:hover::after {
  width: 100%;
}
</style>