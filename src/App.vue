<template>
  <div>
    <Navi></Navi>
    <router-view></router-view>
  </div>
</template>

<script>
import Navi from './components/Navi';

export default {
  name: 'App',
  data: function() {
    return { msg: 'Hello' };
  },
  components: { Navi },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.router-link-active,
.router-link-exact-active {
  background-color: 'green';
}
a {
  text-decoration: none;
}
</style>
