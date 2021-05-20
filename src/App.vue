<template>
  <div>
    <Navi :cart="cart"></Navi>
    <router-view
      @addToCart="addToCart"
      :cart="cart"
      @removeFromCart="removeFromCart"
    ></router-view>
  </div>
</template>

<script>
import Navi from './components/Navi';
import useCart from './composables/cart';
export default {
  name: 'App',
  data: function() {
    return {};
  },
  components: { Navi },
  methods: {},
  setup() {
    const { cart, addToCart, removeFromCart } = useCart();

    return { cart, addToCart, removeFromCart };
  },
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
