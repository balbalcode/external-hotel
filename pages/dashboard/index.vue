<script>
export default {
  components: {
    StatDashboard: () =>
      import("@/components/organisms/dashboard/StatDashboard"),
    GuestDashboard: () =>
      import("@/components/organisms/dashboard/GuestDashboard"),
    Layout: () => import("@/layouts/main"),
  },
};
</script>

<style></style>
<template>
  <Layout>
    <div class="font-size-13">
      <div class="w-100">
        <h5 class="font-weight-bold align-self-center font-size-20 mb-3">
          Horison Ultima Bekasi
        </h5>
      </div>
    </div>
    <stat-dashboard />
    <guest-dashboard />
  </Layout>
</template>
