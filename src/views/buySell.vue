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
          <div class="optionCoin">
            <p>Criptomoneda:</p>
            <select id="crypto" class="cryptoOptions" v-model="transactionDates.crypto_code">
              <option disabled>Seleccionar</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USDT">USDT</option>
            </select>
          </div>
          <div class="amountCoin">
            <p>Monto:</p>
            <input type="number" id="amount" class="inputAmount" placeholder="Ingrese el monto.." v-model="transactionDates.crypto_amount"/>
          </div>
        </div>
      </section>
    </div>

    <div class="confirmation">
      <h3>Informe de transacción</h3>
        <div class="Dates">
          <p v-if="flagCompleteForm"><span>Operación: </span>{{ transactionDates.action}}</p>
          <p v-if="flagCompleteForm"><span>Tipo de cripto: </span>{{ transactionDates.crypto_code }}</p>
          <p v-if="flagCompleteForm"><span>Monto a procesar: </span>{{ transactionDates.crypto_amount }}</p>
          <p v-if="flagCompleteForm"><span>Monto en $ARS: </span>{{ coinARSValue }}</p>
        </div>
        
        <div class="btnsConfirm">
          <input type="button" class="btnContinue" @click="confirmOperation(true)" value="Confirmar"/>
        </div>
    </div>
  </div>
</template>

<script>
  import NavbarCw from '../Components/NavbarCw.vue'
  import apiUsers from '../Services/UsersServices'

  export default{
    name: "buySell",

    components: {
      NavbarCw
    },

    data() {
      return {
        flagConfirmation: false,
        transactionDates:{
          user_id: "",
          action:"Compra",
          crypto_code: "",
          crypto_amount: null,
          money: null,
          datetime: ""
        },
        classAction1: "actionOption",
        classAction2: "actionOption2",
        coinARSValue: null, 
      }
      
    },

    computed: {
      flagCompleteForm() {
        return (this.transactionDates.crypto_code && this.transactionDates.crypto_amount != null)
      },
    },

    watch: {
      'transactionDates.crypto'(newVal) {
        if (newVal && this.transactionDates.crypto_amount != null) {
          this.updateCoinARS(); 
        }
      },
      'transactionDates.crypto_amount'(newVal) {
        if (newVal && this.transactionDates.crypto_code != null) {
          this.updateCoinARS(); 
        }
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

      async updateCoinARS() {
        try {
          const value = await this.quoteARS(); 
          console.log(value);
          this.coinARSValue = (value.totalBid * this.transactionDates.crypto_amount); 
        } catch (error) {
          console.error("Error al obtener los datos de la API:", error);
          this.coinARSValue = null; 
        }
      },

      async quoteARS() {
        console.log(this.transactionDates);
        await this.$store.dispatch('loadQuotes', this.transactionDates.crypto_code);
        let value = this.$store.getters.quoteCrypto;
        return (value);
      },

      confirmOperation(boleanValue){
        this.flagConfirmation = boleanValue;
        if(!this.flagConfirmation){
          this.resetData();
          return;
        }
          this.loadDataMissing();
          console.log(this.transactionDates);
          this.loadDates();
      },

      resetData() {
        this.transactionDates = {
          user_id: "",
          action:"Compra",
          crypto_code: "",
          crypto_amount: null,
          money: null,
          datetime: null
        };
      },

      loadDataMissing() {
        this.transactionDates.user_id = this.$store.getters.userName;
        this.transactionDates.money = this.coinARSValue;
        this.transactionDates.datetime = new Date().toLocaleString();
      },

      async loadDates() {
      console.log("Datos enviados a la API:", this.transactionDates);
      try {
        const response = await apiUsers.postData(this.transactionDates);
        console.log("Respuesta de la API:", response.data);
        return response.data; 
      } catch (error) {
        console.error("Error al cargar los datos a la API:", error.message);
        alert("Hubo un error al guardar los datos de transacción. Por favor, intenta de nuevo.");
        return null;
      }
    }
    }
  }
</script>

<style scoped>
    h3{
      margin: 10px 0;
      text-decoration: underline;
      text-decoration-thickness: 2px;
    }

  .containerTransaction{
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 100px 10px;
    gap: 30px;
  }
  .buySellDiv{
    display: flex;
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
    border-radius: 20px;
    border-color: rgb(24, 174, 246);
    border-style: solid;
    padding: 20px;
    background-color: rgb(218, 218, 248);
  }

  .inputDates{
    display: flex;
    flex-direction: column;
    align-items: center;
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
    border-radius: 20px;
    border-color: black;
    border-style: solid;
    border-width: 2px;
    padding: 10px;
  }

  .actionOption2{
    background-color: white;
    border-color: rgb(24, 174, 246);
    border-radius: 20px;
    border-style: solid;
    border-width: 2px;
    max-width: fit-content;
    padding: 10px;
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

  .dataForm{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0;
  }

  .optionCoin, .amountCoin, .exchangeCoin{
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cryptoExchanges{
    width: 135px;
    border-radius: 30px;
    border-color: rgb(24, 174, 246);
    transition: background-color 0.5s; 
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  }

  .cryptoOptions{
    height: 20px;
    width: 102px;
    border-radius: 30px;
    border-color: rgb(24, 174, 246);
    transition: background-color 0.5s; 
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  }

  .inputAmount{
    width: 146px;
    border-radius: 30px;
    border-color: rgb(24, 174, 246);
    transition: background-color 0.5s; 
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  }
  
  .confirmation{
    display: flex;
    flex-direction: column;
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
    font-size: 16.5px;
    border-radius: 20px;
    border-color: rgb(24, 174, 246);
    border-style: solid;
    padding: 15px 20px;
    width: 250px;
    background-color: rgb(218, 218, 248);
  }

  .Dates{
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .Dates p{
    margin: 10px;
    color: blue;
  }

  .Dates span{
    color: black;
    font-weight: bolder;
  }

  .btnContinue{
    font-family: "Inria Sans", sans-serif;
    font-style: normal;
    font-weight: bolder;
    max-width: fit-content;
    font-size: 16px;
    height: 40px;
    margin-top: 20px;
    background-color: white;
    border-color: rgb(24, 174, 246);
    border-radius: 18px;
    border-style: solid;
    transition: background-color 0.5s; 
    box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.2);
  }

  .btnContinue:active{
    background-color: rgb(24, 174, 246); 
    color: white; 
  }

  input[type="number"]::-webkit-inner-spin-button, 
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>