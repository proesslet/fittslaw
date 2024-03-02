<!--

This is where the game will be played. Each round will consist of 2 squares, and the user must click between them. After the first click, record how long it takes to click the other one

After 10 total clicks, record the time it took to click each one. This will be stored with vuex as an object where trial is <difficulty> and results is an array of 10 times

After each round, display a completion screen.

After all rounds are completed, display a completion screen with all the results

This screen only displays once the user clicks start, so we don't need to worry about the start screen



-->

<template>
  <!--Div for the squares-->
  <div>
    <div
      v-for="square in squares"
      :key="square.id"
      :style="{
        width: square.width + 'px',
        height: square.height + 'px',
        backgroundColor: square.color,
        position: 'absolute',
        left: square.left + 'px',
        top: square.top + 'px',
      }"
      @click="click(square)"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    difficulty: Number,
  },
  data() {
    return {
      round: 1,
      distance: 0,
      squares: [],
      currTime: 0,
      times: [],
      trial: 0,
      distances: [],
      clickPerDistance: 0,
    };
  },
  methods: {
    calculateDistances() {
      // Determine 3 different distances based on the difficulty
      const dis1 = 100 * this.difficulty;
      const dis2 = 150 * this.difficulty;
      const dis3 = 200 * this.difficulty;
      this.distance = dis1;
      return [dis2, dis3];
    },
    generateSquares() {
      // generate 2 green squares with a distance of this.distance
      this.squares.push({
        id: 1,
        width: 100,
        height: 100,
        color: "green",
        left: 100,
        top: 100,
      });

      this.squares.push({
        id: 2,
        width: 100,
        height: 100,
        color: "green",
        left: 100 + this.distance,
        top: 100,
      });
    },
    click(square) {
      if (this.trial === 30) {
        // record the times and reset the trial
        // this.$store.commit("addTrial", {
        //   difficulty: this.difficulty,
        //   times: this.times,
        // });
        this.$emit("roundCompleted");

        return;
      }
      // if it is the first click, record the time
      // if it is the second click, record the new time and the difference
      if (this.currTime === 0) {
        this.currTime = new Date().getTime();
      } else {
        let newTime = new Date().getTime();
        let diffObj = {
          time: newTime - this.currTime,
          distance: this.distance,
        };
        this.$store.commit("addTrial", diffObj);
        this.times.push(newTime - this.currTime);
        this.currTime = new Date().getTime();
        this.trial++;
        this.clickPerDistance++;
      }

      if (this.clickPerDistance >= 10) {
        // change the distance
        this.clickPerDistance = 0;
        this.distance = this.distances.shift();
        this.squares[1].left = this.squares[0].left + this.distance;
        // Rerender the squares
        this.squares = [...this.squares];
      }
    },
  },
  mounted() {
    this.distances = this.calculateDistances();
    this.generateSquares();
  },
};
</script>
