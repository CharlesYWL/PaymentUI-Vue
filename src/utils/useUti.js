// useage: import useUti from '../../utils/useUti';
// setup() {
//   const { centToDollar } = useUti();
//   return { centToDollar };
// }

// import {ref, computed} from 'vue';
import { loadStripe } from '@stripe/stripe-js';

export default function() {
  function centToDollar(cents) {
    let i = parseInt(cents);
    return '$' + i / 100 + '.' + String(i % 100).padEnd(2, 0);
  }

  const stripePromise = loadStripe(
    'pk_test_51IZipEIbg2Wdh6h2Czeqs7j35oIHGaPgFiWzjdR6mqdnX0Qwbx3PTPJEDYFXw6p8aM7lgRCSpnNRlhuKhzP6bepL00X7tqXf2a'
  );

  return { centToDollar, stripePromise };
}
