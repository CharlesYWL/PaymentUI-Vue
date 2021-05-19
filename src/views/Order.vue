<template>
  <div>
    <div v-if="success">
      <div>Thanks for you Order</div>
      <div>Please Review them in Email</div>
      <div className="cursor-pointer"></div>
      <router-link to="/">
        <Button>Back to home</Button>
      </router-link>
    </div>
    <div v-else>
      <div>Somethings goes wrong with Order</div>
      <Button @click="$router.back()">click back</Button>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export default {
  data: () => {
    return {};
  },
  setup: () => {
    const route = useRoute();
    const success = computed(() => !!route.query.success);

    return { success };
  },
};
</script>

<style></style>
