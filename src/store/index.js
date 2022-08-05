import VueX from 'vuex'
import Vue from 'vue'
Vue.use(VueX)
const store = new VueX.Store({
  state: {
    address: '',
    odd1: false,
    odd2: false,
  },
  mutations: {
    modifyOdd1: (state, { val }) => {
      state.odd1 = val
    },
    modifyOdd2: (state, { val }) => {
      state.odd2 = val
    },
    replaceAdd: (state, { address }) => {
      state.address = address
    },
  },
})
export default store
