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
      localStorage.setItem('isAuthenticated', isAuthenticated); // Store authentication state in local storage
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
        // Your login logic
        commit('setAuthenticated', true); // Set authentication state to true upon successful login
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
        // Your registration logic
        commit('setAuthenticated', true); // Set authentication state to true upon successful registration
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
        // Your logout logic
        commit('setAuthenticated', false); // Set authentication state to false upon logout
        commit('setErrorMessage', '');
        commit('setSuccessMessage', 'Logout successful!');
      } catch (error) {
        console.error('Error logging out:', error);
        // Handle logout error if needed
      }
    }
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    errorMessage: state => state.errorMessage,
    successMessage: state => state.successMessage
  }
});
