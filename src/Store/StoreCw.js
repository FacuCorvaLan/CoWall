import {createStore} from 'vuex';
import apiCrypto from '../Services/ApiCriptoYa'


export default createStore({
  state:{
    userName: "",
    quoteCrypto:{},
  },

  getters:{
    userName (state){
      return state.userName;
    },

    quoteCrypto (state){
      return state.quoteCrypto;
    },
  },

  mutations:{
    completeUserName (state, name){
      state.userName = name;
    },

    completeQuoteCrypto(state, quote){
      state.quoteCrypto = quote;
    },
  },
  
  actions:{
    loadUserName ({commit}, nameValue){
      commit('completeUserName', nameValue);
    },

    async loadQuotes({ commit }, typeCoin) {
      try {
        const response = await apiCrypto.getQuotes(typeCoin);
        console.log(response.data);
        const apiData = response.data;
        commit('completeQuoteCrypto', apiData);
      } catch (error) {
        console.error('Error al cargar la cotización:', error);
      }
    },

    async loadDataSet(datesValue) {
      try {
        const response = await apiUsers.postInfo(datesValue);
        console.log("Respuesta de la API:", response.data);
        return response.data; 
      } catch (error) {
        console.error("Error al cargar los datos a la API:", error.message);
        alert("Hubo un error al guardar los datos de transacción. Por favor, intenta de nuevo.");
        return null;
      }
    }

  }
});

