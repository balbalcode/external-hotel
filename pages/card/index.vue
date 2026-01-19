<script>
export default {
  components: {
    Layout: () => import("@//layouts/main"),
    FormCard: () => import("@/components/organisms/card/FormCard"),
    DetailCard: () => import("@/components/organisms/card/DetailCard"),
    TableGuest: () => import("@/components/organisms/guest/data/TableGuest"),
  },
  data: () => {
    return {
      filter: {
        range: [],
        rfid: "",
        name: "",
      },
      data: {
        total_values: 0,
        values: [],
      },
      helper: {
        isSearching: false,
        isNewScan: false,
      },
    };
  },
  methods: {
    processFillingData(data) {
      this.data = {
        values: data.values,
        totalValues: data.totalValues,
      };
      console.log(data, "here!");
      this.filter.range = [
        this.$utility.momentAddDate(new Date(), "-2", "months", "YYYY-MM-DD"),
        this.$utility.formatDateMoment(new Date(), "YYYY-MM-DD"),
      ];
      this.filter.rfid = data.values[0].rfid;
      this.helper.isSearching = true;
    },

    processRequestScan() {
      this.data = {
        values: [],
        total_values: 0,
      };
      this.$nextTick(() => {
        this.helper.isNewScan = true;
      });
    },
  },
};
</script>

<style></style>
<template>
  <Layout>
    <div class="bg-white rounded-lg p-3 mt-3">
      <DetailCard
        :data="data"
        v-if="data.values.length > 0"
        @requestScan="processRequestScan"
      />
      <FormCard
        v-else
        @reset="
          () => {
            helper.isNewScan = false;
            this.data = {
              values: [],
              total_values: 0,
            };
          }
        "
        @ready="processFillingData"
        :new-scan="helper.isNewScan"
      />
      <div class="mt-3"></div>
      <table-guest
        v-if="data.values.length > 0"
        ref="tableGuest"
        @ready="helper.isSearching = false"
        :is-searching="helper.isSearching"
        :filter="filter"
      />
    </div>
  </Layout>
</template>
