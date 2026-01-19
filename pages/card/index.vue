<script>
export default {
  components: {
    Layout: () => import("@//layouts/main"),
    FormCard: () => import("@/components/organisms/card/FormCard"),
    DetailCard: () => import("@/components/organisms/card/DetailCard"),
  },
  data: () => {
    return {
      data: {
        total_values: 0,
        values: [],
      },
      helper: {
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
      {{ helper.isNewScan }}
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
    </div>
  </Layout>
</template>
