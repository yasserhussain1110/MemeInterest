<template>
  <div class="meme-board">
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
  </div>
</template>

<script>
  import Masonry from 'masonry-layout';

  export default {
    name: "meme-board",
    mounted: function () {
      const msnry = new Masonry('.meme-board', {
        itemSelector: '.item',
      });
    }
  }
</script>

<style scoped>
  .meme-board {
    margin-top: 70px;
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

  .img-container > img{
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
