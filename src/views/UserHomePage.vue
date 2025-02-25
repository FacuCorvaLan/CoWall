<template>
<div v-if="isLoading" class="loading-container">
    <p>Cargando datos...</p>
    <div class="loadLine"><img src="../assets/Images/iconLoading.jpg" alt="Cargando" class="imgloading"></div>
</div>
<div class="containerProfile" v-else-if="infoLoad">
  <NavbarCw/>
  <div class="containerWallet"><myWallet/></div>
  <WebFooter/> 
</div>

<div class="divNewProfile" v-else>
  <NavbarCw/>
  <div class="section1">
    <div class="presentation">
      <div class="introduction"><p>Bienvenido <span>{{ this.$store.state.userName }}</span></p><p>¡Comienza tu recorrido en el mundo del Trading!</p></div>
      <div class="cryptoLogos">
        <img src="../assets/Images/logoBTC.png" class="imgLogos"/>
        <img src="../assets/Images/logoETH.png" class="imgLogos"/>
        <img src="../assets/Images/logoUSDT.png" class="imgLogos"/>
        <img src="../assets/Images/logoDOGE.png" class="imgLogos"/>
        <img src="../assets/Images/logoXRP.png" class="imgLogos"/>
        <img src="../assets/Images/logoADA.png" class="imgLogos"/>
      </div>
      <div class="btnDiv">
        <input class="btnStartHere" type="button" @click="this.$router.push('/tranding')" value="Comienza aquí !!"/>
      </div>
    </div>
    <div class="tblPrices">
      <h1>Precios de nuestras criptomonedas</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Símbolo</th>
              <th>Compra ($ARS)</th>
              <th>Venta ($ARS)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(crypto, index) in infoCryptos" :key="index">
              <td>{{ crypto.name }}</td>
              <td>{{ crypto.code }}</td>
              <td>{{ crypto.pricePurchase }}</td>
              <td>{{ crypto.priceSale }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
  <WebFooter/>
</div>
</template>

<script>
import NavbarCw from '../Components/NavbarCw.vue';
import myWallet from '../Components/myWallet.vue';
import WebFooter from '../Components/WebFooter.vue';
import { formatARS } from '../Methods/FormatData';

export default {
  name: "UserHomePage",
  components: {
    NavbarCw,
    myWallet,
    WebFooter
  },

  computed:{
    infoLoad(){
      return this.$store.getters.infoUploaded;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },

    infoCryptos() {
      const cryptos = this.$store.state.quoteCryptos;

      if (!cryptos || Object.keys(cryptos).length === 0 || Object.values(cryptos).some(crypto =>crypto?.totalAsk == null
       || crypto?.totalBid == null || crypto?.totalAsk === 0 || crypto?.totalBid === 0)) {
        return {};
      }else{
        return {
          BTC:{
              name: "Bitcoin", 
              code: "BTC", 
              pricePurchase: formatARS(cryptos.BTC.totalAsk),
              priceSale: formatARS(cryptos.BTC.totalBid)
          },
          ETH:{
            name: "Ethereum", 
            code: "ETH", 
            pricePurchase: formatARS(cryptos.ETH.totalAsk),
            priceSale: formatARS(cryptos.ETH.totalBid)
          },
          USDT:{
            name: "Tether", 
            code: "USDT", 
            pricePurchase: formatARS(cryptos.USDT.totalAsk),
            priceSale: formatARS(cryptos.USDT.totalBid)
          },
          DOGE:{
            name: "DogeCoin", 
            code: "DOGE", 
            pricePurchase: formatARS(cryptos.DOGE.totalAsk),
            priceSale: formatARS(cryptos.DOGE.totalBid)
          },
          XRP:{
            name: "Ripple", 
            code: "XRP", 
            pricePurchase: formatARS(cryptos.XRP.totalAsk),
            priceSale: formatARS(cryptos.XRP.totalBid)
          },
          ADA:{
            name: "Cardano", 
            code: "ADA", 
            pricePurchase: formatARS(cryptos.ADA.totalAsk),
            priceSale: formatARS(cryptos.ADA.totalBid)
          }
        }
      }
    },
  },
  
  created(){
    this.$store.dispatch('loadHistory', this.$store.state.userName);

  },

  methods: {
    formatARS,
  }
}
</script>

<style scoped>
  .loading-container{
    position: fixed; 
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Inria Sans", sans-serif;
    font-weight: bold;
    font-style: normal;
    font-size: 35px;
    gap: 20px;
  }
  .imgloading{
    width: 50px;
    height: 50px;
    object-fit: contain;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

  .divNewProfile{
    display: flex;
    justify-content: space-around;
    flex-direction: column;
  }

  .section1{
    display: flex;
    justify-content: center;
    margin: 100px 0;
  }

  .section1 p{
    font-family: "Inria Sans", sans-serif;
    font-weight: bold;
    font-style: normal;
    font-size: 28px;
    margin-top: 10px;
    margin-bottom: 0;
  }

  .presentation{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .introduction{
    display: flex;
    flex-direction: column;
  }

  .introduction span{
    color:rgb(96, 96, 233);
  }

  .cryptoLogos{
    display: grid;
    grid-template-columns: repeat(3, 1fr); 
    gap: 5px; 
    justify-items: center;
    align-items: center; 
    margin: 20px; 
  }

  .cryptoLogos img{
    width: 100px; 
    height: auto; 
  }

  .btnDiv{
    display: flex;
  }

  .btnStartHere{
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
    font-weight: bolder;
    max-width: fit-content;
    font-size: 25px;
    height:50px;
    background-color: white;
    border-color: rgb(24, 174, 246);
    border-radius: 18px;
    border-style: solid;
    transition: background-color 0.5s; 
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  .btnStartHere:hover {
    background-color: rgba(96, 96, 233, 0.2);
  }

  .btnStartHere:active {
    background-color: rgb(24, 174, 246);
    color: white; 
  }

  .tblPrices{
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width:fit-content;
    margin-left: 45px;
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
    border-radius: 8px;
  }

  table {
    width: 500px;
    border-collapse: collapse;
    border: 1px solid rgb(24, 174, 246);
    text-align: center;
    margin-top: 5px;
  }

  thead {
    background-color: blue;
    color: white;
  }

  th, td {
    padding: 12px 15px;
    border: none; 
  }

  tbody tr:hover {
    background-color: rgba(96, 96, 233, 0.2);
  }

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
