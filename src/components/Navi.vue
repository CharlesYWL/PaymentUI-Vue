<template>
  <div class="navi">
    <img
      class="logo"
      alt="Vue logo"
      src="../assets/logo.png"
      @click="jumpTo('/')"
    />

    <div class="navi-option">
      <div v-for="path in naviOption" :key="path">
        <router-link :to="path.url" class="navi-link">
          <Button :class="{ 'correct-path': isActive(path.url) }">
            {{ path.name }}
          </Button>
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
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Cart', url: '/cart' },
      ],
    };
  },
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
  computed: {},
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
