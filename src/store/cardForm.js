import { defineStore } from "pinia";

export const useCardFormStore = defineStore("cardForm", {
  state: () => ({
    userData: {},
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
