<!--

Design a simple interface to conduct a Fitt's law experiment. The interface should:
o for each trial, present a start-up screen so that the user can get ready
(1pt),
o for each trial, present a pairs of squares on the screen and let the user
first click inside the leftmost square then click back and forth between the
2 squares as fast as they can for at least 10 times (users need to click
inside the square each time) (1pt),
o for each trial, record the time it took the user to click between the 2 square
(10 samples are recorded) (1pt),
o present a series of trials spanning the index of difficulty from 2 to 6. For
each index of difficulty, your program should measure at least 3 possible
width/distance combinations. Since you are recording 10 action per
condition, your system should at least record 150 trials per users (1pt),
o for each trial, present a completion screen (1pt),
o present a completion screen at the end of the test (1pt).

-->

<template>
  <div id="app">
    <div v-if="!started">
      <h1>Get ready</h1>
      <button @click="start">Start</button>
    </div>
    <div v-else-if="betweenRounds">
      <h1>Round {{ difficulty - 1 }} completed</h1>
      <button @click="nextRound">Next Round</button>
    </div>
    <div v-else-if="gameCompleted">
      <h1>Game Completed</h1>
      <table>
        <tr>
          <th>Distance (px)</th>
          <th>Average Time (ms)</th>
        </tr>
        <tr v-for="result in resultsArray" :key="result.distance">
          <td>{{ result.distance }}</td>
          <td>{{ result.avg }}</td>
        </tr>
      </table>
    </div>

    <div v-else>
      <FittsGame :difficulty="difficulty" @roundCompleted="roundCompleted" />
    </div>
  </div>
</template>

<script>
import FittsGame from "./components/FittsGame.vue";
export default {
  data() {
    return {
      started: false,
      completed: false,
      difficulty: 2,
      betweenRounds: false,
      gameCompleted: false,
      finalResults: null,
      resultsArray: [],
    };
  },
  components: {
    FittsGame,
  },
  methods: {
    start() {
      this.started = true;
    },
    roundCompleted() {
      if (this.difficulty <= 6) {
        this.betweenRounds = true;
      } else {
        this.finalResults = this.$store.state.trials;
        // Iterate through map
        for (let [distance, times] of this.finalResults) {
          // Calculate the average time for each distance
          let sum = times.reduce((a, b) => a + b, 0);
          let avg = sum / times.length;
          this.resultsArray.push({ distance, avg });
        }

        this.gameCompleted = true;
      }
    },
    nextRound() {
      this.betweenRounds = false;
      this.difficulty++;
    },
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

button {
  padding: 10px 20px;
  font-size: 20px;
  margin-top: 20px;
}

div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
