import { createApp } from "vue";
import App from "./App.vue";

// Create a store to keep track of all the trial data
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      trials: new Map(),
    };
  },
  mutations: {
    addTrial(state, trial) {
      // If map contains distance, add new distance to the array for that distance
      if (state.trials.has(trial.distance)) {
        state.trials.get(trial.distance).push(trial.time);
      } else {
        // If map doesn't contain distance, create new array for that distance
        state.trials.set(trial.distance, [trial.time]);
      }
    },
  },
  actions: {
    addTrial(context, trial) {
      context.commit("addTrial", trial);
    },
  },
  getters: {
    getTrials(state) {
      return state.trials;
    },
  },
});

createApp(App).use(store).mount("#app");
