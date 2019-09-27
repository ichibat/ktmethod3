<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ScoreComponent msg="Welcome to Your Score Vue.js App" />
  </div>
</template>

<script>
import ScoreComponent from "./components/ScoreComponent.vue";

export default {
  name: "app",
  components: {
    ScoreComponent
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
