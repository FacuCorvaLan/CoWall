import {createStore} from 'vuex';
import { cryptoData } from '../Methods/valueCryptos';
import { historyData } from '../Methods/loadHistoryUser';


export default createStore({
  state:{
    userName: "",
    closeUser: "",
    quoteCryptos:{},
    historyUser: {}
  },

  getters:{
    getHistoryUser(state) {return state.historyUser},

    infoUploaded(state){
      return (state.historyUser && Object.keys(state.historyUser).length > 0 && 
      state.quoteCryptos && Object.keys(state.quoteCryptos).length > 0)
    }
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
      }
    },

    async loadHistory({ commit }, valueName){
      try{
        if(valueName === ""){
          alert("No se puede acceder al historial sin el nombre de usuario.");
          return;
        }
        const response = await historyData(valueName);
        if (response.data && response.data.length > 0) {
          commit('completeHistoryUser', response.data);
        } else {
          console.error("No tiene historial este usuario.");
          commit('completeHistoryUser', []); 
        }
      }catch (error){
        console.error("Error al cargar el historial:", error);
      }
    }

  }
});

