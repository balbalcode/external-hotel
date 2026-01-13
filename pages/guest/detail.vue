<template>
  <Layout><detail-guest /></Layout>
</template>

<script>
export default {
  components: {
    DetailGuest: () => import("@/components/templates/guest/DetailGuest"),
    Layout: () => import("@//layouts/main"),
  },
};
</script>

<style></style>
