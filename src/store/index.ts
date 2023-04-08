import { createStore } from 'vuex'

import type { State } from '@/types'
import products from '@/modules/products'

const index = createStore<State>({
  state() {
    return {
      products,
      brands: ['All', 'Apple', 'Samsung', 'Xiaomi', 'Google'],
      memory: ['All', '64', '128', '256', '512']
    }
  },
  getters: {
    products(state) {
      return state.products
    },
    brands(state) {
      return state.brands
    },
    memory(state) {
      return state.memory
    }
  }
})

export default index