import {createStore} from 'vuex';
import apiCrypto from '../Services/ApiCriptoYa'


export default createStore({
  state:{
    userName: "",
    closeUser: "",
    quoteCrypto:{},
  },

  getters:{
    userName (state){
      return state.userName;
    },

    quoteCrypto (state){
      return state.quoteCrypto;
    },

    closeUser (state){
      return state.closeUser;
    }
  },

  mutations:{
    completeUserName (state, name){
      state.userName = name;
    },

    completeQuoteCrypto(state, quote){
      state.quoteCrypto = quote;
    },

    completeCloseUser(state, boleanValue){
      state.closeUser = boleanValue;
    }
  },
  
  actions:{
    loadUserName ({commit}, nameValue){
      commit('completeUserName', nameValue);
    },

    confirmLogOut ({commit}, boleanValue){
      commit('completeCloseUser', boleanValue);
    },

    async loadQuotes({ commit }, typeCoin) {
      try {
        const response = await apiCrypto.getQuotes(typeCoin);
        const apiData = response.data;
        commit('completeQuoteCrypto', apiData);
      } catch (error) {
        console.error('Error al cargar la cotización:', error);
      }
    }
  }
});

