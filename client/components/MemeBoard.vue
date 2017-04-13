<template>
  <div v-masonry transition-duration="0.3s" item-selector=".item" class="meme-board">
    <div v-masonry-tile class="item" v-if="nav==='my'">
      <div v-on:click="addMeme" class="add-meme">
        <div class="plus">
          <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
        </div>
      </div>
    </div>

    <div v-masonry-tile class="item" v-for="(meme, index) in memesToShow">
      <div class="img-container">
        <img :src="meme.url"/>
      </div>

      <div class="description">
        <span>{{meme.description}}</span>
      </div>

      <div class="actions">
        <img v-on:click="showUserMemes(meme._addedBy._id)" :src="meme._addedBy.photos[0].value"/>
        <div v-on:click="removeMeme(index)" v-bind:class="{'show-remove': nav==='my'}" class="remove">
          <i class="fa fa-times" aria-hidden="true"></i>
        </div>
        <div class="likes">
          <i
            v-on:click="likeOrUnlikeMeme(index)"
            v-bind:class="{liked: meme.iLiked, banned: !me}"
            class="fa fa-star" aria-hidden="true"></i>
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
  import {unlikeMeme, likeMeme, removeMeme} from '../lib/fetch';

  export default {
    name: "meme-board",
    props: ["nav"],
    data() {
      return {
        addCaption: setting.memeBoard.addCaption
      }
    },
    computed: {
      ...mapState({
        me: state => state.me,
        allMemes: state => state.allMemes,
        myMemeIndices: state => state.myMemeIndices,
        userMemeIndices: state => state.userMemeIndices
      }),
      myMemes: function () {
        return this.myMemeIndices.map(memeIndex => this.allMemes[memeIndex]);
      },
      userMimes: function () {
        return this.userMemeIndices.map(memeIndex => this.allMemes[memeIndex]);
      },
      memesToShow: function () {
        if (this.nav === 'all') {
          return this.allMemes;
        } else if (this.nav === 'my') {
          return this.myMemes;
        } else if (this.nav === 'user') {
          return this.userMimes;
        }
      }
    },
    methods: {
      addMeme: function () {
        this.$emit('addMeme');
      },
      showUserMemes: function (userId) {
        this.$store.commit('buildUserMemeIndices', userId);
        this.$emit('changeNav', (this.me && userId === this.me._id) ? "my" : "user");
      },
      likeOrUnlikeMeme: function (memeToShowIndex) {
        let memeIndex;
        if (this.nav === 'all') {
          memeIndex = memeToShowIndex;
        } else if (this.nav === 'my') {
          memeIndex = this.myMemeIndices[memeToShowIndex];
        } else if (this.nav === 'user') {
          memeIndex = this.userMemeIndices[memeToShowIndex];
        }

        let meme = this.allMemes[memeIndex];
        if (meme.iLiked) {
          unlikeMeme(this, meme, memeIndex);
        } else {
          likeMeme(this, meme, memeIndex);
        }
      },
      removeMeme: function (memeToShowIndex) {
        if (memeToShowIndex >= this.myMemeIndices.length) {
          return console.log("Some weired error. Please check.");
        }

        let memeIndex = this.myMemeIndices[memeToShowIndex];
        let meme = this.allMemes[memeIndex];
        removeMeme(this, meme, memeIndex);
      }
    }
  }
</script>

<style scoped>

  @-moz-document url-prefix() {
    .meme-board {
      font-size: 12px;
    }
  }

  .banned:hover {
    cursor: not-allowed;
  }

  .add-meme {
    text-align: center;
    position: relative;
    height: 100px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
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
    width: 80%;
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
    padding: 5px;
    margin: 5px;
    text-align: center;
    border: 1px solid gray;
    box-shadow: 0 0 5px gray;
    border-radius: 5px;
    word-wrap: break-word;
  }

  .actions {
    margin-top: 10px;
  }

  .actions > img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
  }

  .actions > div {
    display: inline-block;
    vertical-align: top;
  }

  .remove {
    margin-left: 35px;
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

  .remove:active {
    box-shadow: none;
  }

  .likes {
    margin-left: 25px;
    padding: 6px;
  }

  .likes > i {
    cursor: pointer;
  }

  .liked {
    color: blue;
  }

</style>
