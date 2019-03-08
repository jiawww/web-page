<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body{
  margin:0;
}
/* 响应式设置 */

/* @media only screen and (max-width: 767px) {
  html {
    font-size: 18.75px;
  }
}
@media only screen and (min-width: 768px) and (max-width: 991x) {
  html {
    font-size: 19.4063px;
  }
}
@media only screen and (min-width: 992px) and (max-width: 1200px) {
  html {
    font-size: 22.5px;
  }
}
@media only screen and (min-width: 1201px) and (max-width: 1920px) {
  html {
    font-size: 22.5px;
  }
}
@media screen and (min-width: 1920px) {
  html {
    font-size: 30px;
  }
} */
</style>
