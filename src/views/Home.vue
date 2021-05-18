<!-- The `template` of MyComponent-->
<template>
  <div>
    <div class="goods" v-if="!isLoading && goods.length">
      <div v-for="good in goods" :key="good.name">
        <Card class="good">
          <template #header>
            <img
              class="item-img"
              :alt="good.name + 'img'"
              :src="good.data.product_data.images[0]"
            />
          </template>
          <template #title>
            {{ good.name }}
          </template>
          <template #footer>
            <router-link
              :to="{ name: 'ItemDetail', params: { itemId: good.name } }"
            >
              <Button icon="pi pi-check" label="Purchase" />
            </router-link>
          </template>
        </Card>
      </div>
    </div>
    <div v-else-if="!isLoading && !!!goods.length">
      <p>Sorry, no items avaliable</p>
    </div>
    <div v-else>
      <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
    </div>
  </div>
</template>

<!-- The `data` and `methods` are defiend in script tag-->
<script>
import { reactive } from 'vue';
import Card from 'primevue/card';
import { request } from '../utils/apiUtils';
// import { onMounted } from 'vue';

export default {
  name: 'Home',
  components: { Card },
  props: [],
  data() {
    return {
      goods: reactive([]),
      isLoading: true,
    };
  },
  methods: {
    jumpTo(itemId) {
      console.log(itemId);
    },
    fetchItems() {
      request
        .get('./stripe/get-goods')
        .then((res) => {
          console.log(res.itemList);
          this.goods = res.itemList;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<!-- The styling of the component is done in style tag -->
<style scoped lang="sass">
p
    line-height: 1.5
    margin: 0
.item-img
  width: 300px
  height: 300px
  object-fit: cover
.goods
    display: flex
    justify-content: center
    align-items: center
.good
  margin: 10px
</style>
