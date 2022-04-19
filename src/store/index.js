import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    productsToCart: [],
    handlerCart: 0
  },
  mutations: {
    addToCart(state, payload) {
      if(!state.productsToCart.find(pr => pr.id == payload.product.id)) {
        payload.product.qtdCart = 0
        state.productsToCart.push(payload.product);
      }

      state.productsToCart.find(pr => pr.id == payload.product.id).qtdCart += payload.qtd
      state.handlerCart = Math.random();
    },
    removeToCart(state, payload) {
      state.handlerCart = Math.random();
      state.productsToCart.find(pr => pr.id == payload.id).qtdCart--;
      if(payload.qtdCart === 0) {
        state.productsToCart.splice(state.productsToCart.findIndex(pr => pr.id == payload.id), 1)
        return;
      }
    }
  },
  actions: {
  },
  getters: {
    handlerCart: state => state.handlerCart,
    productsToCart: state => state.productsToCart,
    qtdProductsToCart: state => {
      state.handlerCart;
      return state.productsToCart.reduce((acc, current) => {
        return acc += current.qtdCart
      }, 0)
    }
  },
  modules: {
  }
})
