<template>
  <div>
    <section
      v-if="!!item && !isLoading"
      :style="{ width: '300px', height: '600px', margin: 'auto' }"
    >
      <div class="product">
        <img
          :src="item.data.product_data.images[0]"
          :alt="item.name"
          class="image"
        />
        <div class="description">
          <h3>{{ item.name }}</h3>
          <h5>{{ centToDollar(item.data.unit_amount) }}</h5>
        </div>
      </div>
      <Button type="button" class="p-px-3 stripe-btn" @click="handleClick()">
        <img class="btn-icon" src="/img/stripe-logo-blue.png" />
      </Button>
    </section>
    <section v-else-if="!isLoading && !item">
      <p>Sorry, item not avaliable</p>
    </section>
    <section v-else>
      <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
    </section>
  </div>
</template>

<script>
import { getItem, request } from '../../utils/apiUtils';
import { reactive } from 'vue';

import useUti from '../../utils/useUti';

// import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(
//   'pk_test_51IZipEIbg2Wdh6h2Czeqs7j35oIHGaPgFiWzjdR6mqdnX0Qwbx3PTPJEDYFXw6p8aM7lgRCSpnNRlhuKhzP6bepL00X7tqXf2a'
// );

export default {
  name: 'ItemDetail',
  props: ['itemId'],
  data() {
    return {
      item: reactive({}),
      isLoading: true,
    };
  },
  methods: {
    fetchItem() {
      return getItem(this.itemId)
        .then((res) => {
          console.log(res);
          this.item = res;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async handleClick() {
      let stripe = await this.stripePromise;
      request
        .post('/stripe/create-checkout-session-single-vue', {
          id: this.itemId,
          quantity: 1,
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
  mounted() {
    this.fetchItem().then(() => {
      console.log(!!this.item, this.isLoading);
    });
  },
  setup() {
    const { centToDollar, stripePromise } = useUti();
    return { centToDollar, stripePromise };
  },
};
</script>

<style>
.image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
.btn-icon {
  height: 35px;
  object-fit: scale-down;
}
.stripe-btn {
  background-color: white !important;
}
</style>
