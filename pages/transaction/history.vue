<script>
export default {
  data: () => ({
    filter: {
      type: {},
      value: "",
      dateRange: "",
      qr: "",
    },
    helper: { isSearching: false },
    selectedData: {},
  }),
  watch: {
    report: {
      deep: true,
      handler() {
        this.processNamingReportFile();
      },
    },
  },
  methods: {
    processSetPayloadFilter(value) {
      this.filter = value;
      this.selectedData = {};
      this.helper.isSearching = true;
    },

    processSetSelected(data) {
      if (data) {
        this.selectedData = data;
      } else {
        this.selectedData = {};
      }
    },
  },
  components: {
    Layout: () => import("@/layouts/main"),
    SquareCard: () => import("@utilities/atoms/card/SquareCard"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ContentTitle: () => import("@utilities/atoms/title/ContentTitle"),
    ContentDivider: () => import("@utilities/atoms/utility/ContentDivider"),
    FilterTransactionHistory: () =>
      import(
        "@/components/organisms/transaction/history/FilterTransactionHistory"
      ),
    ReminderTransactionHistory: () =>
      import(
        "@/components/organisms/transaction/history/ReminderTransactionHistory"
      ),
    TableTransactionHistory: () =>
      import(
        "@/components/organisms/transaction/history/TableTransactionHistory"
      ),
  },
};
</script>
<template>
  <div class="font-size-13">
    <div class="w-100">
      <h5 class="font-weight-bold align-self-center font-size-20 mb-3">
        Riwayat Transaksi
      </h5>
    </div>
    <!-- <reminder-transaction-history /> -->
    <div class="bg-white rounded-lg shadow p-3 mt-3">
      <div class="d-flex justify-content-between mb-3">
        <div>
          <h5 class="font-weight-bold align-self-center font-size-16 mb-3">
            Daftar Transaksi
          </h5>
        </div>
        <div class="">
          <active-button
            text="Buat Transaksi"
            additional_class=""
            @click="$router.push('/transaction/create')"
          />
        </div>
      </div>
      <filter-transaction-history
        ref="filterHistory"
        @update="processSetPayloadFilter"
      />
      <table-transaction-history :filter="filter" />
    </div>
  </div>
</template>
