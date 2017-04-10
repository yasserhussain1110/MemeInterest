<template>
  <div id="app">
    <nav-bar></nav-bar>
    <meme-board></meme-board>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';
  import MemeBoard from './components/MemeBoard';
  export default {
    name: "app",
    components: {
      NavBar,
      MemeBoard
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: #F2F2F2;
  }

  button, a{
    cursor: pointer;
  }
</style>
