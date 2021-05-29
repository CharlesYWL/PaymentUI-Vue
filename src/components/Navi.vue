<template>
  <div class="navi">
    <img
      class="logo"
      alt="Vue logo"
      src="@/assets/Logo.png"
      @click="jumpTo('/')"
    />

    <div class="navi-option">
      <div v-for="path in naviOption" :key="path">
        <router-link :to="path.url" class="navi-link">
          <Button
            type="button"
            class="my-btn"
            :class="{ 'correct-path': isActive(path.url) }"
            :badge="path.name === 'Cart' ? cartNumber.toString() : ''"
            :label="path.name"
            :icon="path.icon"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navi',
  data: function() {
    return {
      naviOption: [
        { name: 'Home', url: '/', icon: 'pi pi-home' },
        { name: 'About', url: '/about', icon: 'pi pi-info-circle' },
        { name: 'Cart', url: '/cart', icon: 'pi pi-shopping-cart' },
      ],
    };
  },
  props: ['cart'],
  components: {},
  methods: {
    isActive: function(url) {
      let currentUrl = window.location.pathname;
      return url === currentUrl;
    },
    jumpTo: function(url) {
      console.log(url);
      this.$router.push(url);
    },
  },
  computed: {
    cartNumber() {
      if (typeof this.cart === 'object' && this.cart !== null) {
        return Object.keys(this.cart).reduce(
          (sum, key) => sum + this.cart[key] || 0,
          0
        );
      }

      return 0;
    },
  },
};
</script>

<style lang="sass">
.navi
  display: flex
  justify-content: center
  align-items: center
.navi-option
  display: flex
  width: 100%
  justify-content: space-between
  align-items: center
  padding: 10px 50px
.navi-link
  color: white
  text-decoration: none
.logo
  height: 75px
  weight: 75px
.correct-path
  background-color: green !important
</style>
