<template>
  <div class="meme-board">
    <template v-if="nav==='all'">
      <div class="item liked">
        <div class="img-container">
          <img src="https://s-media-cache-ak0.pinimg.com/736x/0f/ca/94/0fca9410f129246c116d99b8d7791413.jpg"/>
        </div>

        <div class="description">
          <span>Awesome Possum Roman</span>
        </div>

        <div class="actions">
          <img src="https://pbs.twimg.com/profile_images/670879941970362368/NNEapuL3_normal.jpg"/>
          <div class="likes">
            <i class="fa fa-star" aria-hidden="true"></i>
            <span>25</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else-if="nav==='my'">
      <div class="item">
        <div class="add-meme">
          <div class="caption">
            <span>{{addCaption}}</span>
          </div>
          <div class="plus">
            <i class="fa fa-plus fa-3x" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import Masonry from 'masonry-layout';
  import setting from '../../setting';

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
        itemSelector: '.item',
      });
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

  .likes {
    margin-left: 85px;
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