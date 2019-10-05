import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload
    }
  }
});

export default store;