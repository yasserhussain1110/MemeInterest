<template>
  <footer>
    <div class="node">
      <a target="_blank" href="https://nodejs.org"><img src="../assets/node.png"/></a>
    </div>

    <div class="express">
      <a target="_blank" href="https://expressjs.com"><img src="../assets/express.png"/></a>
    </div>

    <div class="mongodb">
      <a target="_blank" href="https://www.mongodb.com"><img src="../assets/mongodb.png"/></a>
    </div>

    <div class="vue">
      <a target="_blank" href="https://vuejs.org"><img src="../assets/vue.png"/></a>
    </div>

    <div class="vuex">
      <a target="_blank" href="https://vuex.vuejs.org/en"><img src="../assets/vuex.jpg"/></a>
    </div>

    <div class="socket">
      <a target="_blank" href="https://socket.io"><img src="../assets/socket.png"/></a>
    </div>

    <div class="github">
      <a title="Click to see source code!" target="_blank" href="https://github.com/yasserhussain1110/MemeInterest">
        <img src="../assets/github.png"/></a>
    </div>

    <div class="twitter-link"><a href="https://twitter.com/yasserhussain11">@yasserhussain1110</a></div>
  </footer>
</template>

<script>
  export default {
    name: "stack"
  }
</script>

<style scoped>
  footer {
    text-align: center;
    margin: 320px auto 0 auto;
    padding: 0;
    background-color: white;
    border-radius: 20px;
    width: 40%;
  }

  img {
    border-radius: 10px;
  }

  div {
    display: inline-block;
    padding: 5px;
  }

  .node img {
    width: 60px;
    height: 45px;
  }

  .express img {
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 5px;
  }

  .mongodb img {
    width: 50px;
    height: 50px;
    margin-top: 10px;
    vertical-align: bottom;
  }

  .vue img {
    width: 40px;
    height: 40px;
  }

  .vuex img {
    width: 70px;
    height: 40px;
  }

  .socket img {
    width: 40px;
    height: 40px;
    margin-bottom: 3px;
  }

  .github img {
    width: 40px;
    height: 40px;
    margin-bottom: 5px;
  }

  .twitter-link {
    display: block;
    margin-top: 5px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
