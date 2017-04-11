<template>
  <div v-on:click="hideNewMemeModal" v-show="showNewMemeModal" class="modal-mask">
    <div v-on:click.stop="" class="modal-container">
      <h2>{{addCaption}}</h2>
      <div class="pic-box">
        <img src="/static/placeholder.png" onError="this.src='/static/placeholder.png';"/>
      </div>
      <div class="input-box">
        <form v-on:submit="addMeme">
          <div class="input">
            <label>URL:</label>
            <input v-on:keyup="updateImageSrc" v-model="url" placeholder="Enter URL" type="url" required/>
          </div>
          <div class="input">
            <label>Description:</label>
            <input v-model="description" placeholder="Enter Meme Description" type="text"/>
          </div>
          <div class="input">
            <button>Add</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {newMemeModal} from '../../setting';
  import {addMeme} from '../lib/fetch';

  export default {
    name: "new-meme-modal",
    props: ["showNewMemeModal"],
    data() {
      return {
        url: "",
        description: "",
        imageSrc: "../assets/placeholder.png",
        addCaption: newMemeModal.addCaption
      }
    },
    methods: {
      addMeme: function (event) {
        event.preventDefault();
        const {url, description} = this;
        addMeme(this, {url, description});
      },
      hideNewMemeModal: function () {
        this.url = "";
        this.description = "";
        this.$emit("hideNewMemeModal");
      },
      updateImageSrc: function () {
        document.querySelector(".pic-box img").src = this.url;
      }
    }
  }
</script>


<style scoped>
  .input-box {
    margin-top: 40px;
    padding: 0 10px;
    text-align: center;
  }

  label {
    display: inline-block;
    width: 100px;
  }

  .input {
    margin: 10px 0;
  }

  input {
    padding: 5px;
    height: 25px;
    width: 250px;
    border: 1px solid black;
    border-radius: 5px;
  }

  button {
    margin-top: 20px;
    width: 70px;
    height: 40px;
    background-color: green;
    border: 2px solid gray;
    color: white;
    border-radius: 5px;
    outline: none;
    box-shadow: 1px 1px 5px gray;
    font-size: 1.2em;
  }

  button:active {
    box-shadow: none;
  }

  .pic-box {
    margin-top: 30px;
  }

  .pic-box > img {
    height: 270px;
    width: 350px;
    border-radius: 10px;
  }

  .modal-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(128, 128, 128, 0.7);
  }

  .modal-container {
    border-radius: 10px;
    box-shadow: 0 0 5px white;
    text-align: center;
    width: 440px;
    height: 550px;
    background-color: white;
    margin: 50px auto;
    padding: 10px;
  }

</style>
