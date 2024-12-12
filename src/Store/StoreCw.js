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
  }
});

