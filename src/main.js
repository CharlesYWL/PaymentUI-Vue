import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

// PrimeVue part
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

//vue3-async-computed-
// import * as AsyncComputed from 'vue3-async-computed';
// const asyncComputed = AsyncComputed.createPlugin({ ref: Vue.ref });

createApp(App)
  .use(router)
  .use(PrimeVue)
  // .use(asyncComputed)
  .component('Button', Button)
  .mount('#app');
