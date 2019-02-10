<template>
  <div id="app">
    <Main />
    <verte picker="square" model="rgb"></verte>
  </div>
</template>

<script>
import Main from './components/Main.vue'
import Verte from 'verte';
import Vue from 'vue';
import 'verte/dist/verte.css';
Vue.component('verte', Verte);

export default {
  name: 'app',
  components: {
    Main,
    Verte
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; /* Branding green */
  margin-top: 50px;
}
</style>
