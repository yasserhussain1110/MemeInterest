<template>
  <div class="nav">
    <div class="icon">
      <img src="../assets/pinterest.png"/>
    </div>

    <div class="all nav-item" v-bind:class="{selected: nav==='all'}">
      <a v-on:click="changeNav('all')">{{navSetting.all}}</a>
    </div>

    <div class="my nav-item"
         v-bind:class="{hidden:!isLoggedIn, selected: nav==='my'}">
      <a v-on:click="changeNav('my')">{{navSetting.my}}</a>
    </div>

    <div class="auth">
      <form v-if="isLoggedIn" method="get" action="/logout">
        <button class="big-button"><i class="fa fa-twitter"></i>Logout</button>
        <button class="small-button"><i class="fa fa-sign-out"></i></button>
      </form>

      <form v-else method="post" action="/login">
        <button class="big-button"><i class="fa fa-twitter"></i>Login</button>
        <button class="small-button"><i class="fa fa-twitter"></i></button>
      </form>
    </div>

  </div>
</template>

<script>
  import setting from '../../settings';
  import {mapState} from 'vuex';

  export default {
    name: "nav",
    props: ["nav"],
    data() {
      return {
        navSetting: setting.nav
      }
    },
    computed: {
      ...mapState({
        isLoggedIn: state => state.isLoggedIn
      })
    },
    methods: {
      changeNav: function (newNav) {
        this.$emit('changeNav', newNav);
      }
    }
  }
</script>

<style scoped>
  .nav {
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    color: #777;
    box-shadow: 0 1px 1px black;
    width: 100%;
    z-index: 1;
  }

  img {
    height: 40px;
    width: 40px;
  }

  div {
    display: inline-block;
    vertical-align: middle;
  }

  .nav-item {
    padding: 20px 4px;
    margin: 0 5px;
    height: 20px;
  }

  .hidden {
    visibility: hidden;
  }

  .selected {
    background-color: #E7E7E7;
  }

  .icon {
    margin-left: 40px;
    margin-right: 10px;
    padding-top: 3px;
  }

  button {
    padding: 10px 10px;
    background-color: #F8F8F8;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    font-size: 1.01em;
  }

  button > i {
    margin-right: 5px;
  }

  .auth {
    margin-left: 70%;
  }

  button:focus {
    outline: none;
  }

  button:hover {
    background-color: #E6E6E6;
    border: 1px solid #ccc;
  }

  button:active {
    box-shadow: inset 0 0 6px gray;
  }

  @-moz-document url-prefix() {
    .nav-item {
      font-size: 11px;
      font-weight: bolder;
    }
  }

  .small-button {
    display: none;
  }

  @media screen and (max-width: 1260px) {
    .auth {
      margin-left: 65%;
    }
  }

  @media screen and (max-width: 1082px) {
    .auth {
      margin-left: 60%;
    }
  }

  @media screen and (max-width: 949px) {
    .auth {
      margin-left: 56%;
    }
  }

  @media screen and (max-width: 864px) {
    .auth {
      margin-left: 52%;
    }
  }

  @media screen and (max-width: 793px) {
    .auth {
      margin-left: 48%;
    }
  }

  @media screen and (max-width: 733px) {
    .auth {
      margin-left: 45%;
    }
  }

  @media screen and (max-width: 694px) {
    .auth {
      margin-left: 40%;
    }
  }

  @media screen and (max-width: 637px) {
    .auth {
      margin-left: 35%;
    }
  }

  @media screen and (max-width: 589px) {
    .auth {
      margin-left: 30%;
    }
  }

  @media screen and (max-width: 548px) {
    .auth {
      margin-left: 25%;
    }
  }

  @media screen and (max-width: 513px) {
    .auth {
      margin-left: 20%;
    }
  }

  @media screen and (max-width: 482px) {
    .auth {
      margin-left: 15%;
    }
  }

  @media screen and (max-width: 454px) {
    .auth {
      margin-left: 20%;
    }

    .small-button {
      display: initial;
      padding: 5px 10px;
    }

    .small-button > i {
      margin: 0;
    }

    .big-button {
      display: none;
    }
  }

  @media screen and (max-width: 414px) {
    .auth {
      margin-left: 15%;
    }
  }

  @media screen and (max-width: 391px) {
    .auth {
      margin-left: 10%;
    }
  }

  @media screen and (max-width: 371px) {
    .auth {
      margin-left: 6%;
    }
  }
</style>
