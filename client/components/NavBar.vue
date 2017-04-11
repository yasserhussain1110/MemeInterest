<template>
  <div class="nav">
    <div class="icon">
      <img src="../assets/pinterest.png"/>
    </div>

    <div class="all nav-item ">
      <a>{{navSetting.all}}</a>
    </div>

    <div class="my nav-item" v-bind:class="{hidden:!isLoggedIn}">
      <a>{{navSetting.my}}</a>
    </div>

    <div class="auth">
      <form v-if="isLoggedIn" method="get" action="/logout">
        <button>Logout</button>
      </form>

      <form v-else method="post" action="/login">
        <button>Login</button>
      </form>
    </div>

  </div>
</template>

<script>
  import setting from '../../setting';
  import {mapState} from 'vuex';

  export default {
    name: "nav",
    data() {
      return {
        navSetting: setting.nav
      }
    },
    computed: {
      ...mapState({
        isLoggedIn: state => state.isLoggedIn
      })
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
    padding: 10px 20px;
    background-color: #F8F8F8;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    font-size: 1.01em;
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

  button:focus {
    box-shadow: inset 0 0 6px gray;
  }

  @media screen and (max-width: 1224px) {
    .auth {
      margin-left: 65%;
    }
  }

  @media screen and (max-width: 1048px) {
    .auth {
      margin-left: 60%;
    }
  }

  @media screen and (max-width: 917px) {
    .auth {
      margin-left: 56%;
    }
  }

  @media screen and (max-width: 834px) {
    .auth {
      margin-left: 52%;
    }
  }

  @media screen and (max-width: 764px) {
    .auth {
      margin-left: 48%;
    }
  }

  @media screen and (max-width: 705px) {
    .auth {
      margin-left: 45%;
    }
  }

  @media screen and (max-width: 667px) {
    .auth {
      margin-left: 40%;
    }
  }

  @media screen and (max-width: 611px) {
    .auth {
      margin-left: 35%;
    }
  }

  @media screen and (max-width: 611px) {
    .auth {
      margin-left: 30%;
    }
  }

  @media screen and (max-width: 524px) {
    .auth {
      margin-left: 25%;
    }
  }

  @media screen and (max-width: 489px) {
    .auth {
      margin-left: 20%;
    }
  }

  @media screen and (max-width: 458px) {
    .auth {
      margin-left: 15%;
    }
  }
</style>
