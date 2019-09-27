<template>
  <div class="container">
    <h1>Latest Scores</h1>
    <div class="create-score">
      <label for="create-score">Score Something...</label>
      <input type="text" id="create-score" v-model="text" placeholder="Create a score" />
      <button v-on:click="createScore">Score!!</button>
    </div>
    <hr />
    <p class="error" v-if="error">{{error}}</p>
    <div class="scores-container">
      <div
        class="score"
        v-for="(score,index) in scores"
        v-bind:item="score"
        v-bind:index="index"
        v-bind:key="score._id"
        v-on:dblclick="deleteScore(score._id)"
      >
        {{ `${score.createdAt.getDate()}/${score.createdAt.getMonth()}/${score.createdAt.getFullYear()}`}}
        <p class="text">{{score.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ScoreService from "../ScoreService";
export default {
  name: "ScoreComponent",
  data() {
    return {
      scores: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.scores = await ScoreService.getScores();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createScore() {
      await ScoreService.insertScore(this.text);
      this.scores = await ScoreService.getScores();
    },
    async deleteScore(id) {
      await ScoreService.deleteScore(id);
      this.scores = await ScoreService.getScores();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.score {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}
div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15 px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>