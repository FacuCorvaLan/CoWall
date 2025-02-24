import {createStore} from 'vuex';
import { cryptoData } from '../Methods/valueCryptos';
import { historyData } from '../Methods/loadHistoryUser';


export default createStore({
  state:{
    userName: "",
    closeUser: "",
    quoteCryptos:{},
    historyUser: {},
    loadingData: false,
    TransactionState: ""
  },

  getters:{
    getHistoryUser(state) {return state.historyUser},

    infoUploaded(state){
      return (state.historyUser && Object.keys(state.historyUser).length > 0 && 
      state.quoteCryptos && Object.keys(state.quoteCryptos).length > 0);
    },

    isNewUser(state) {
      return state.historyUser && Object.keys(state.historyUser).length === 0;
    },

    isLoading(state) {
      return state.loadingData; 
    },
  },

  mutations:{
    completeUserName (state, name){
      state.userName = name;
    },

    completeQuoteCrypto(state, quote){
      state.quoteCryptos = quote;
    },

    completeCloseUser(state, boleanValue){
      state.closeUser = boleanValue;
    },

    completeHistoryUser(state, valueHistory){
      state.historyUser = valueHistory;
    },

    completeLoad(state, boleanLoad){
      state.loadingData = boleanLoad;
    },

    completeConfirmTransaction(state, boleanValue){
      state.transactionState = boleanValue;
    }
  },
  
  actions:{
    loadUserName ({commit}, nameValue){
      commit('completeUserName', nameValue);
    },

    confirmLogOut ({commit}, boleanValue){
      commit('completeCloseUser', boleanValue);
    },

    async loadQuotes({ commit }) {
      try {
        const [btc, eth, usdt, doge, xrp, ada] = await Promise.all([
          cryptoData("BTC"),
          cryptoData("ETH"),
          cryptoData("USDT"),
          cryptoData("DOGE"),
          cryptoData("XRP"),
          cryptoData("ADA"),
        ]);

        const quotesCryptos = {
        BTC: btc.data != "" ? btc.data : null,
        ETH: eth.data != "" ? eth.data : null,
        USDT: usdt.data != "" ? usdt.data : null,
        DOGE: doge.data != "" ? doge.data : null,
        XRP: xrp.data != "" ? xrp.data : null, 
        ADA: ada.data != "" ? ada.data : null,
        }
        commit('completeQuoteCrypto', quotesCryptos);
      } catch (error) {
        console.error('Error al cargar la cotización:', error);
        commit('completeQuoteCrypto', {});
      }
    },

    async loadHistory({ commit }, valueName){
      try{
        if(valueName === ""){
          alert("No se puede acceder al historial sin el nombre de usuario.");
          return;
        }

        commit('completeLoad', true);
        const response = await historyData(valueName);
        console.log("Historial del usuario: ",response.data);

        if (response.data && response.data.length > 0) {
          commit('completeHistoryUser', response.data);
        } else {
          commit('completeHistoryUser', []); 
        }
      }catch (error){
        console.error("Error al cargar el historial:", error);
      }finally {
        commit('completeLoad', false); 
      }
    },

    resetStates({commit}){     
      commit('completeUserName', "");
      commit('completeQuoteCrypto', {});
      commit('completeHistoryUser', {});
    },

    confirmTransaction({commit}, boleanValue){
      commit('completeConfirmTransaction', boleanValue);
    }
  }
});

