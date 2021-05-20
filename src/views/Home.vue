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
          <template #content>
            {{ centToDollar(good.data.unit_amount) }}
          </template>
          <template #footer>
            <div class="buy-buttons">
              <router-link
                :to="{ name: 'ItemDetail', params: { itemId: good.name } }"
                class="btn"
              >
                <Button icon="pi pi-shopping-cart" label="Buy Now" />
              </router-link>
              <Button
                icon="pi pi-plus-circle"
                label="Add to cart"
                class="btn"
                @click="$emit('addToCart', good.name)"
              />
            </div>
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
import { getAllItems } from '../utils/apiUtils';
import useUti from '../utils/useUti';

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
      getAllItems()
        .then((res) => {
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
  setup() {
    const { centToDollar } = useUti();
    return { centToDollar };
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
.buy-buttons
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
.btn
  width: fit-content
  margin: auto
  margin-top: 10px
</style>
