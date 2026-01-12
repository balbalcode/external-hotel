<template>
  <div>
    <div class="row m-0">
      <div class="col-12 col-lg-3"><detail-guest-overview /></div>
      <div class="col-12 col-lg-9">
        <div class="bg-white pt-2 pb-3 px-3 rounded border ">
          <detail-guest-information />
          <detail-logs-transaction />
          <detail-guest-logs />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    DetailGuestInformation: () =>
      import("@/components/organisms/guest/DetailGuestInformation"),
    DetailLogsTransaction: () =>
      import("@/components/organisms/guest/DetailLogsTransaction"),
    DetailGuestLogs: () =>
      import("@/components/organisms/guest/DetailGuestLogs"),
    DetailGuestOverview: () =>
      import("@/components/organisms/guest/DetailGuestOverview"),
  },
};
</script>

<style></style>
