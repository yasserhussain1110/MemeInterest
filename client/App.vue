<template>
  <div id="app">
    <nav-bar v-on:changeNav=changeNav :nav="nav"></nav-bar>
    <meme-board v-on:changeNav=changeNav v-on:addMeme="addMeme" :nav="nav"></meme-board>
    <new-meme-modal v-on:hideNewMemeModal="hideNewMemeModal" :showNewMemeModal="showNewMemeModal"></new-meme-modal>
    <stack></stack>
  </div>
</template>

<script>
  import NavBar from './components/NavBar';
  import MemeBoard from './components/MemeBoard';
  import NewMemeModal from './components/NewMemeModal.vue';
  import Stack from './components/Stack.vue';
  import {getIdentity, getAllMemes, buildMyMemes} from './lib/fetch';
  import {mapState} from 'vuex';
  import io from 'socket.io-client';

  const amITheOriginator = (me, payload) => {
    return me && me._id === payload._originator
  };

  export default {
    name: "app",
    data() {
      return {
        nav: "all",  // One of 'all', 'my', 'user'
        showNewMemeModal: false,
        socket: null
      }
    },
    components: {
      NavBar,
      MemeBoard,
      NewMemeModal,
      Stack
    },
    computed: {
      ...mapState({
        me: state => state.me
      })
    },
    created() {
      this.readySocketIO();

      getAllMemes(this)
        .then(() => getIdentity(this))
        .then(() => buildMyMemes(this))
        .catch(e => {
          console.log("Get Identity Failed. Won't attempt to get build my Memes indices.")
        });
    },
    methods: {
      changeNav: function (newNav) {
        this.nav = newNav;
      },
      addMeme: function () {
        this.showNewMemeModal = true;
      },
      hideNewMemeModal: function () {
        this.showNewMemeModal = false;
      },
      readySocketIO: function () {
        this.socket = io.connect();
        this.attachSocketIOListeners();
      },
      attachSocketIOListeners: function () {
        this.socket.on('memeAdded', (payload) => {
          if (!amITheOriginator(this.me, payload)) {
            this.$store.commit('addedMeme', payload.meme);
          }
        });

        this.socket.on('memeRemoved', (payload) => {
          if (!amITheOriginator(this.me, payload)) {
            this.$store.commit('removedMemeById', payload.memeId);
            if (this.me) {
              this.$store.commit('buildMyMemeIndices');
            }
          }
        });

        this.socket.on('memeLiked', (payload) => {
          if (!amITheOriginator(this.me, payload)) {
            this.$store.commit('likedMemeById', payload.memeId);
          }
        });

        this.socket.on('memeUnliked', (payload) => {
          if (!amITheOriginator(this.me, payload)) {
            this.$store.commit('unlikedMemeById', payload.memeId);
          }
        });
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
