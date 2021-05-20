import { reactive } from 'vue';

export default function useCart() {
  // cart: [{name:'sampletest0',quanity:1}]
  const cart = reactive({});
  const addToCart = (item) => {
    if (!(item in cart)) {
      cart[item] = 0;
    }
    cart[item] += 1;
  };
  const removeFromCart = (item) => {
    if (item in cart) {
      cart[item] -= 1;
    }
    if (cart[item] === 0) {
      delete cart[item];
    }
  };
  // const addToCart = (item) => {
  //   const index = cart.map((x) => x.name).indexOf(item);
  //   if (index === -1) {
  //     cart.push({ name: item, quanity: 0 });
  //   }
  //   cart[cart.length - 1].quanity += 1;
  //   console.log('after add:', cart);
  // };
  // const removeFromCart = (item) => {
  //   const index = cart.map((x) => x.name).indexOf(item);
  //   if (index === -1) return;
  //   cart[index].quanity -= 1;
  //   if (cart[index].quanity === 0) {
  //     cart.splice(index, 1);
  //   }
  //   console.log('after remove:', cart);
  // };
  return { cart, addToCart, removeFromCart };
}
