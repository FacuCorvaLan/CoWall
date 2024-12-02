import {createStore} from 'vuex';

export default createStore({
  state:{
    userName: ""
  },

  getters:{
    userName (state){
      return state.userName;
    }
  },

  mutations:{
    completeUserName (state, name){
      state.userName = name;
    }
  },
  
  actions:{
    loadUserName ({commit}, nameValue){
      commit('completeUserName', nameValue);
    }
  }

});

