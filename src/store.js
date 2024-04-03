import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    errorMessage: '',
    successMessage: ''
  },
  mutations: {
    setAuthenticated(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
      localStorage.setItem('isAuthenticated', isAuthenticated);
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
    setSuccessMessage(state, successMessage) {
      state.successMessage = successMessage;
    }
  },
  actions: {
    async login({ commit }) {
      try {
        commit('setAuthenticated', true);
        commit('setErrorMessage', '');
        commit('setSuccessMessage', 'Login successful!');
      } catch (error) {
        console.error('Error logging in:', error);
        commit('setAuthenticated', false);
        commit('setErrorMessage', error.message);
        commit('setSuccessMessage', '');
      }
    },
    async register({ commit }) {
      try {
        commit('setAuthenticated', true);
        commit('setErrorMessage', '');
        commit('setSuccessMessage', 'Registration successful!');
      } catch (error) {
        console.error('Error registering user:', error);
        commit('setAuthenticated', false);
        commit('setErrorMessage', error.message);
        commit('setSuccessMessage', '');
      }
    },
    async logout({ commit }) {
      try {
        commit('setAuthenticated', false);
        commit('setErrorMessage', '');
        commit('setSuccessMessage', 'Logout successful!');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage
  }
});
