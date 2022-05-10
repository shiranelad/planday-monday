import { createStore } from 'vuex';
import { boardStore } from './modules/board-store.js';
// import { userStore } from './modules/user.store.js'

// create a store instance
const store = createStore({
  strict: true,
  state: {
      isLoading: true,
      isError: false
  },
  getters: {
      isError({ isError }) {
          return isError
      }
  },
  mutations: {
      setIsLoading(state, { isLoading }) {
          state.isLoading = isLoading
      },
      setIsError(state, { isError }) {
          state.isError = isError
      }
  },
  actions: {},
  modules: {
    boardStore,
    // userStore,
  },
});

export default store;
