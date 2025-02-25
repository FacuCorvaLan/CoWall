<template>
  <div class="containerTransaction">
    <NavbarCw />
    <div class="buySellDiv">
      <section class="inputDates">
        <div class="operations">
          <p :class="isPurchase ? 'actionClass1' : 'actionClass2'">Comprar</p>
          <button class="buttonImg" @click="typeTransaction"></button>
          <p :class="!isPurchase ? 'actionClass1' : 'actionClass2'">Vender</p>
        </div>
        <div class="dataForm">
          <div class="optionCoin">
            <p>Criptomoneda:</p>

            <select id="crypto" class="cryptoOptions" v-model="transactionData.crypto_code">
              <option disabled value="">Seleccionar</option>
              <option  value="BTC">BTC</option>
              <option  value="ETH">ETH</option>
              <option  value="USDT">USDT</option>
              <option  value="DOGE">DOGE</option>
              <option  value="XRP">XRP</option>
              <option  value="ADA">ADA</option>
            </select>
          </div>
          <div class="amountCoin">
            <p>Monto:</p>
            <input type="number" id="amount" class="inputAmount" placeholder="Ingrese el monto..." v-model="transactionData.crypto_amount"/>
          </div>
        </div>
      </section>
    </div>
    <div class="confirmation">
      <h3>Informe de transacción</h3>
      <div class="Dates">
        <p><span>Operación: </span>{{ coinARSValue != null ? operation : "" }}</p>
        <p><span>Tipo de cripto: </span>{{ coinARSValue != null ? transactionData.crypto_code : "" }}</p>
        <p><span>Monto a procesar: </span>{{ coinARSValue != null ? transactionData.crypto_amount : "" }}</p>
        <p><span>Monto en ARS: </span>{{ coinARSValue != null ? (formatARS(coinARSValue)) : "" }}</p>
      </div>
      <div class="btnsConfirm">
        <input type="button" class="btnContinue" @click="confirmOperation(true)" value="Confirmar" />
      </div>
    </div>
    <div class="divFinish" v-show="this.flagWindow">
      <div class="nextAction">
      <h1>{{ messageTransaction }}</h1>
      <div class="actionsBtn">
        <input type="button" class="btnContinue" @click="this.flagWindow = false" value="Seguir comprando..."/>
        <div class="linkRecord" @click="openPerfil"><p>Ir a mi perfil.</p></div>
      </div>
    </div>
    </div>
    
  </div>

  <WebFooter/>
</template>

<script>
import NavbarCw from "../Components/NavbarCw.vue";
import { postInfo } from "../Services/UsersServices";
import { formatARS } from "../Methods/FormatData";
import WebFooter from '../Components/WebFooter.vue';
import moment from "moment";

export default {
  name: "buySell",
  components: { 
    NavbarCw,
    WebFooter
  },
  data() {
    return {
      boleanMessage: false,
      transactionData: {
        user_id: "",
        action: "purchase",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      },
      isPurchase: true, 
      coinARSValue: null,
      flagWindow:false
    };
  },
  computed: {
    flagCompleteForm() {
      return this.transactionData.crypto_code != "" && this.transactionData.crypto_amount > 0;

    },
    operation() {
      return this.isPurchase ? "Compra" : "Venta";
    },

    messageTransaction(){
      if(this.boleanMessage){
        return "Transacción Exitosa.";
      }else{
        return "Hubo un error en la transacción.";
      }
    }
  },
  watch: {
    "transactionData.crypto_code": "updateCoinARS",
    "transactionData.crypto_amount": "updateCoinARS",
  },
  methods: {
    formatARS,

    typeTransaction() {
      this.isPurchase = !this.isPurchase;
      this.transactionData.action = this.isPurchase ? "purchase" : "sale";
      this.updateCoinARS();
    },

    updateCoinARS() {
      if (!this.flagCompleteForm) {
        this.coinARSValue = null;
        return;
      }
      const value = this.quoteARS();
      if(!value){
        alert("No hay cotización para esa moneda.");
      }else{
        this.coinARSValue = Number(value.toFixed(2));
      }
    },

    quoteARS() {
      const codeCrypto = this.transactionData.crypto_code;
      const value = this.$store.state.quoteCryptos[codeCrypto];
      if(this.transactionData.action === "purchase"){
        return value.totalAsk * this.transactionData.crypto_amount;
      }else{
        return value.totalBid * this.transactionData.crypto_amount;
      }
    },

    confirmOperation(isConfirmed) {
      if (!isConfirmed) return this.resetData();
      this.completeTransactionData();
      try {
        postInfo(this.transactionData, this.$store);
        this.$store.dispatch('loadHistory', this.$store.state.userName);
        this.$store.dispatch('loadQuotes');
        if(this.$store.state.transactionState){this.message = "Transacción Exitosa."}
        this.flagWindow = true;
        this.boleanMessage = true;
      } catch (error) {
        console.Error("No se pudo guardar los datos de la transacción.");
        this.message = "No se pudo guardar los datos de transacción";
        this.flagWindow = true;
        this.boleanMessage = false;
      }
    },

    completeTransactionData() {
      this.transactionData.user_id = this.$store.state.userName;
      this.transactionData.money = this.coinARSValue;
      this.transactionData.datetime = moment().toISOString();
    },

    resetData() {
      this.transactionData = {
        user_id: "",
        action: "purchase",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
      };
    },

    openPerfil(){
      const nameUser = this.$store.state.userName;
      this.$router.push({name:'Profile', params:{userName: nameUser}});
      this.flagWindow = false;
    }
  },
};
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
  padding: 150px 10px 0;
  gap: 30px;
}
.buySellDiv{
  display: flex;
  justify-content: center;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  border-radius: 20px;
  border-color: rgb(24, 174, 246);
  border-style: solid;
  width: 250px;
  height: 264px;
  padding: 15px;
  background-color: rgb(218, 218, 248);
}

.inputDates{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: fit-content;
}

.operations{
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: fit-content;
}

.actionClass1{
  background-color: blue;
  color: white;
  max-width: fit-content;
  border-radius: 20px;
  border-color: black;
  border-style: solid;
  border-width: 2px;
  padding: 10px;
  font-weight: bolder;
}

.actionClass2{
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

.linkRecord{
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: -30px;
}

.linkRecord p {
  position: relative;
  margin-bottom: 0;
  font-size: 15px;
  display: inline-block;
  color: blue;
  text-decoration: none;
}

.linkRecord p::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: blue;
  transition: width 0.3s ease-out;
}

.linkRecord p:hover::after {
  width: 100%;
}

.divFinish{
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); 
  display: flex;
  justify-content: center; 
  align-items: center;
}

.nextAction{
  padding: 20px;
  font-family: "Inria Sans", sans-serif;
  font-style: normal;
  background-color: rgb(218, 218, 248);;
  border-color: rgb(24, 174, 246);
  border-style: solid;
  border-radius: 10px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); 
  max-width: fit-content;
}

.actionsBtn{
  display: flex;
  align-items: center;
  gap: 20px;
}
input[type="number"]::-webkit-inner-spin-button, 
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
