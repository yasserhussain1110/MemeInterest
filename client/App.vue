<template>
  <div id="app">
    <nav-bar v-on:changeNav=changeNav :nav="nav"></nav-bar>
    <meme-board :nav="nav"></meme-board>
    <new-meme-modal></new-meme-modal>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';
  import MemeBoard from './components/MemeBoard';
  import {getIdentity} from './lib/fetch';
  import NewMemeModal from './components/NewMemeModal.vue';

  export default {
    name: "app",
    data() {
      return {
        nav: "all"  // One of 'all', 'my'
      }
    },
    components: {
      NavBar,
      MemeBoard,
      NewMemeModal
    },
    created() {
      getIdentity(this);
    },
    methods: {
      changeNav: function (newNav) {
        this.nav = newNav;
      }
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

  button, a {
    cursor: pointer;
  }
</style>
