// useage: import useUti from '../../utils/useUti';
// setup() {
//   const { centToDollar } = useUti();
//   return { centToDollar };
// }

// import {ref, computed} from 'vue';

export default function() {
  function centToDollar(cents) {
    let i = parseInt(cents);
    return '$' + i / 100 + '.' + String(i % 100).padEnd(2, 0);
  }

  return { centToDollar };
}
