<template>
  <div class="meme-board">
    <div class="item" v-if="nav==='my'">
      <div v-on:click="addMeme" class="add-meme">
        <div class="caption">
          <span>{{addCaption}}</span>
        </div>
        <div class="plus">
          <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div class="item" v-bind:class="{liked: meme.iLiked}" v-for="(meme, index) in memesToShow">
      <div class="img-container">
        <img :src="meme.url"/>
      </div>

      <div class="description">
        <span>{{meme.description}}</span>
      </div>

      <div class="actions">
        <img :src="meme._addedBy.photos[0].value"/>
        <div v-bind:class="{'show-remove': nav==='my'}" class="remove">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="likes">
          <i class="fa fa-star" aria-hidden="true"></i>
          <span>{{meme.totalLikes}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Masonry from 'masonry-layout';
  import setting from '../../setting';
  import {mapState} from 'vuex';

  export default {
    name: "meme-board",
    props: ["nav"],
    data() {
      return {
        addCaption: setting.memeBoard.addCaption
      }
    },
    mounted: function () {
      const msnry = new Masonry('.meme-board', {
        itemSelector: '.item'
      });
    },
    computed: {
      ...mapState({
        allMemes: state => state.allMemes,
        myMemeIndices: state => state.myMemeIndices,
        userMemeIndices: state => state.userMemeIndices
      }),
      myMemes: function () {
        return this.myMemeIndices.map(memeIndex => this.allMemes[memeIndex]);
      },
      memesToShow: function () {
        if (this.nav === 'all') {
          return this.allMemes;
        } else if (this.nav === 'my') {
          return this.myMemes;
        } else if (this.nav === 'user') {
          return null;
        }
      }
    },
    methods: {
      addMeme: function () {
        this.$emit('addMeme');
      }
    }
  }
</script>

<style scoped>

  .add-meme {
    text-align: center;
    position: relative;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .caption {
    top: 40px;
    font-weight: bolder;
    opacity: 0.8;
  }

  .plus {
    top: 25px;
    color: darkgreen;
    opacity: 0.8;
  }

  .add-meme > div {
    position: absolute;
    width: 100%;
  }

  .meme-board {
    margin: 70px auto 0 auto;
    width: 80%
  }

  .item {
    margin: 10px;
    float: left;
    border: 1px solid gray;
    border-radius: 10px;
    box-shadow: 0 0 5px gray;
    padding: 5px;
    width: 170px;
  }

  .img-container > img {
    max-width: 100%;
    border-radius: 10px;
  }

  .description {
    max-width: 100%;
    margin: 5px;
    text-align: center;
  }

  .actions > img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
  }

  .actions > div {
    display: inline-block;
    vertical-align: top;
  }

  .remove {
    margin-left: 65px;
    padding: 6px;
    cursor: pointer;
    color: darkred;
    visibility: hidden;
  }

  .show-remove {
    visibility: visible;
  }

  .remove:hover {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 0 10px gray;
  }

  .likes {
    margin-left: 0;
    cursor: pointer;
    padding: 6px;
  }

  .likes:hover {
    padding: 5px;
    border: 1px solid gray;
    border-radius: 5px;
    box-shadow: 0 0 10px gray;
  }

  .likes:active {
    box-shadow: none;
  }

  .liked i {
    color: blue;
  }

</style>
