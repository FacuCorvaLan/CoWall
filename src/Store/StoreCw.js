import {createStore} from 'vuex';

export default createStore({
  state:{
    userName: "",
    DatesTransaction:[]
  },

  getters:{
    userName (state){
      return state.userName;
    },
    
    DatesTransaction (state){
      return state.DatesTransaction;
    }
  },

  mutations:{
    completeUserName (state, name){
      state.userName = name;
    },

    completeDates (state, dates){
      state.DatesTransaction = dates;
    }
  },
  
  actions:{
    loadUserName ({commit}, nameValue){
      commit('completeUserName', nameValue);
    },

    loadDates ({commit}, datesValue){
      commit('completeDates', datesValue);
    }
  }

});

