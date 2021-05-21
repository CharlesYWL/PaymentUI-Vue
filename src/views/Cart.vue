<template>
  <div class="cart-wrapper">
    <div
      class="item"
      v-for="item in cartDetails"
      :key="`${item.name}${item.quantity}`"
    >
      <div class="item-img">
        <img :src="item.data.product_data.images[0]" />
      </div>
      <div class="item-info">
        <div class="item-name">{{ item.name }}</div>
        <div class="item-bot">
          <div class="item-bot-left">
            <div class="item-btn" @click="$emit('removeFromCart', item.name)">
              <i class="pi pi-minus" />
            </div>
            <p>{{ item.quantity }}</p>
            <div class="item-btn" @click="$emit('addToCart', item.name)">
              <i class="pi pi-plus" />
            </div>
          </div>
          <div class="item-bot-right">
            {{ centToDollar(item.quantity * item.data.unit_amount) }}
          </div>
        </div>
      </div>
    </div>
    <Button type="button" class="p-px-3 stripe-btn" @click="handleClick()">
      <img class="btn-icon" src="/img/stripe-logo-blue.png" />
    </Button>
  </div>
</template>

<script>
import useCart from '../composables/cart';
import { reactive } from 'vue';
import { getItem, request } from '../utils/apiUtils';
import useUti from '../utils/useUti';
import { isEqual } from 'lodash';

export default {
  name: 'Cart',
  props: ['cart'],
  data() {
    return {
      cartDetails: reactive([]),
    };
  },
  components: {},
  setup() {
    const { addToCart, removeFromCart } = useCart();
    const { centToDollar, stripePromise } = useUti();
    return { addToCart, removeFromCart, centToDollar, stripePromise };
  },
  methods: {
    fetchItems(cart) {
      let promiseArray = [];
      let results = [];
      if (!cart) return [];
      for (const id of Object.keys(cart)) {
        promiseArray.push(
          new Promise((resolve, reject) => {
            getItem(id)
              .then((res) => {
                return resolve(res);
              })
              .catch((err) => reject(err));
          })
        );
      }
      return Promise.all(promiseArray)
        .then((res) => {
          res.forEach((item) => {
            // this.cartDetails.push({ ...item, quantity: this.cart[item.name] });
            results.push({ ...item, quantity: cart[item.name] });
          });
          return results;
        })
        .catch((err) => {
          console.log(err);

          return [];
        });
    },
    isItemChanged(newV, cartDetails) {
      // newV:{sampletest0:1}
      // cardDetails:[{name:samepletest0,data:{},quanity:1}]
      let oldV = {};
      cartDetails.forEach((x) => {
        oldV[x.name] = x.quantity;
      });
      return !isEqual(Object.keys(oldV), Object.keys(newV));
    },

    async handleClick() {
      let new_line_items = this.cartDetails.map((x) => {
        return { id: x.name.toLowerCase(), quantity: x.quantity };
      });
      let stripe = await this.stripePromise;
      request
        .post('/stripe/create-checkout-session-vue', {
          items: new_line_items,
        })
        .then((session) => {
          console.log(session);
          return stripe.redirectToCheckout({
            sessionId: session.id,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    // This watch will detact the computted value of this.cart
    // cartNumber() {
    //   console.log('cartNumber change');
    //   this.fetchItems(this.cart).then((res) => {
    //     console.log();
    //     this.cartDetails = res;
    //   });
    // },
    cart: {
      handler(newV) {
        // check if there is new items
        // yes: refetch items
        // no: modify quanity
        if (this.isItemChanged(newV, this.cartDetails)) {
          this.fetchItems(newV).then((res) => {
            this.cartDetails = res;
          });
        } else {
          // only change quanity
          this.cartDetails.forEach((x) => {
            x.quantity = newV[x.name];
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,700&display=swap')

.cart-wrapper
  margin: auto
  width: fit-content
  font-family: 'Open Sans', sans-serif

.item
  margin: 10px
  display: flex
  flex-direction: row
  height: 300px
  width: 50%
  align-items: center
  justify-content: space-between
.item-img
  margin-right:10px
  img
    height: 300px
    width: 300px
    object-fit: cover
.item-info
  height: 100%
  width: 100%
  padding: 10px
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: flex-start
  .item-name
    font-size: 18px
  .item-bot
    width: 100%
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    .item-bot-left
      font-size: 18px
      display: flex
      flex-direction: row
      align-items: center
      .item-btn
        margin: 0 10px
        cursor: pointer

        &:hover
          background-color: rgba(0,0,0,.1)
          border-radius: 5px
    .item-bot-right
.btn-icon
  height: 35px
  object-fit: scale-down

.stripe-btn
  background-color: white !important
</style>
