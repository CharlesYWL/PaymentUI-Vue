import { createWebHistory, createRouter } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Cart from '../views/Cart.vue';
import ItemDetail from '../views/Items/ItemDetail.vue';
import NoFound from '../views/NoFound.vue';
import Order from '../views/Order.vue';
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/cart', name: 'Cart', component: Cart },
  {
    path: '/items/:itemId',
    name: 'ItemDetail',
    component: ItemDetail,
    props: true,
  },
  { path: '/order', name: 'Order', component: Order },

  //404
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NoFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
