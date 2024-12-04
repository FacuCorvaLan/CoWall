<template>
  <div class="containerTransaction">
    <NavbarCw/>
    <div class="buySellDiv">
      <section class="inputDates">
        <div class="operations"> 
          <p :class="classAction1">Comprar</p>
          <button class="buttonImg" @click="changesClasses"></button>
          <p :class="classAction2">Vender</p>
        </div>
        <div class="dataForm">
          <select id="crypto" class="cryptoOptions" v-model="transactionDates.crypto">
            <option disabled>Seleccionar</option>
            <option value="BTC">Bitcoin BTC</option>
            <option value="ETH">Ethereum ETH</option>
            <option value="SOL">Solana SOL</option>
          </select>
          <input type="number" id="amount" placeholder="Ingrese el monto.." v-model="transactionDates.crypto_amount"/>
        </div>
        <input type="button" @click="showVerification" value="Continuar"/>
      </section>
    </div>

    <div class="confirmation" v-show="flagShowVerification">
        <div class="Dates">
          <h2>¿Está seguro de realizar esta operación?</h2>
          <p>Operación: {{ transactionDates.action }}</p>
          <p>Tipo de cripto: {{ transactionDates.crypto }}</p>
          <p>Monto: {{ transactionDates.crypto }} </p>
          <p>Monto en pesos: {{ transactionDates.money }}</p>
        </div>

        <div class="btnsConfirm">
          <button @click="finishVerification(true)" value="Confirmar"/>
          <button @click="finishVerification(false)" value="Cancelar"/>
        </div>
    </div>
  </div>
</template>

<script>
  import NavbarCw from '../Components/NavbarCw.vue';

  export default{
    name: "buySell",

    component: {
      NavbarCw
    },
    
    data() {
      return {
        flagConfirmation: false,
        flagShowVerification: false,
        transactionDates:{
          id: "",
          action:"Compra",
          crypto: "",
          crypto_amount: 0,
          money: 0,
          dateTime: null
        },
        classAction1: "actionOption",
        classAction2: "actionOption2"
      }
      
    },

    methods: {
      changesClasses(){
        if(this.classAction1 === "actionOption"){
          this.classAction1 = "actionOption2";
          this.classAction2 = "actionOption";
          this.transactionDates.action = "Venta"
        }else{
          this.classAction1 = "actionOption";
          this.classAction2 = "actionOption2";
          this.transactionDates.action = "Compra"
        }
        console.log(this.transactionDates.action);
      },

      finishVerification(boleanValue) {
        this.flagConfirmation = boleanValue;
        this.confirmOperation();
        this.flagShowVerification = boleanValue;
        this.showVerification();
      },

      confirmOperation(){
        if(!this.flagConfirmation){
          this.transactionDates = {
          id: "",
          action: "Compra",
          crypto: "",
          crypto_amount: 0,
          money: 0,
          dateTime: null,
          };
        }else{
          const nowDate = new Date().toLocaleString();
          this.transactionDates.dateTime = nowDate;
          this.$store.dispatch('loadDates', this.transactionDates);
        }
      },

      showVerification(){
        /*if(this.transactionDates.crypto_amount >= 0){
          this.transactionDates.money = (this.transactionDates.crypto_amount * x)/ y;
        }*/
        this.flagShowVerification = !this.flagShowVerification;
      },
    }
  }
</script>

<style scoped>
  .containerTransaction{
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    padding: 100px 10px;
  }
  .buySellDiv{
    display: flex;
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
  }

  .inputDates{
    display: flex;
    flex-direction: column;
  }

  .operations{
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: lighter;
    max-width: fit-content;
  }

  .actionOption{
    background-color: blue;
    color: white;
    max-width: fit-content;
    border-radius: 18px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
  }

  .actionOption2{
    background-color: white;
    border-color: rgb(24, 174, 246);
    border-radius: 18px;
    border-style: solid;
    border-width: 2px;
    max-width: fit-content;
    padding: 10px;
  }

  .dataForm{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
    background-color: cyan;
  }

  .buttonImg{
    padding: 0;
    margin: 0;
    border-width: 0;
    background-color: transparent;
    background-image: url('../assets/Images/cambioAccion.png');
    background-size: cover;
    background-position: center;
    width: 50px; 
    height: 50px; 
    cursor: pointer;
  }

  .buttonImg:active{
    background-image: url('../assets/Images/cambioAccion2.png');
  }

</style>