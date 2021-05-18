import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './router';

// PrimeVue part
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

createApp(App)
  .use(router)
  .use(PrimeVue)
  .component('Button', Button)
  .mount('#app');
