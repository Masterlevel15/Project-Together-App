import { defineStore } from 'pinia'

export const useMyStore = defineStore({
  id: 'myStore',
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++
    },
  },
})