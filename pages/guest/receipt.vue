<script>
import QrcodeVue from "qrcode.vue";
import { configMethods, resolutionMethods } from "@/store/helperActions";
export default {
  components: {
    Layout: () => import("@/layouts/main"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    QrcodeVue,
  },
  data: () => {
    return {
      data: {},
      helper: {
        CONFIG: {},
        loading: false,
      },
    };
  },
  async mounted() {
    this.helper.CONFIG = await this.processGetConfig();
    this.processSearchTransaction();
  },
  methods: {
    getConfig: configMethods.getConfig,
    getDataResolution: resolutionMethods.getDataResolution,

    setPayloadTransaction() {
      return {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: this.$route.query.id },
          { key: "type", value: "id" },
          { key: "history", value: true },
        ],
        pagination: {
          page: 1,
          per_page: 10,
        },
      };
    },

    processPrintReceipt() {
      const printContent = this.$refs.receiptWrapper;
      const originalContents = document.body.innerHTML;
      const printContents = printContent.innerHTML;

      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    },

    async processGetConfig() {
      try {
        const payload = {
          filter: [
            { key: "corporate_id", value: this.$utility.getCorporateId() },
          ],
        };
        const { values } = await this.getConfig(payload);
        if (values.length > 0) {
          return values[0];
        } else {
          window.location.href = "/guest/current?status=not-configured";
        }
      } catch (error) {
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetConfig in FormCheckoutConfirmation`,
        );
      } finally {
        this.helper.loading = false;
      }
    },

    async processSearchTransaction() {
      try {
        this.helper.loading = true;
        const payload = this.setPayloadTransaction();
        const { values, total_values } = await this.getDataResolution(payload);
        if (total_values > 0) {
          this.data = values[0];
        }
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction in FormGuestMembership`,
        );
      } finally {
        this.helper.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@media print {
  .d-print-none {
    display: none !important;
  }

  @page {
    size: 58mm auto;
    margin: 0;
  }

  body {
    width: 58mm;
    margin: 0;
  }
}
</style>

<template>
  <Layout>
    <div class="bg-white rounded-lg p-3 mt-3">
      <div
        ref="receiptWrapper"
        class="container mx-auto bg-white p-5 border rounded-lg my-3"
        v-if="data.id"
        style="
          width: 303px !important;
          font-family: 'Courier New', monospace;
          text-align: center;
        "
      >
        <!-- Header -->
        <div class="text-center pb-1 mb-1" style="text-align: center">
          <p
            style="text-align: center"
            class="font-size-16 my-0 text-uppercase"
          >
            TIKET PARKIR
          </p>
          <p
            style="text-align: center"
            class="font-size-16 my-0 text-uppercase"
          >
            {{ data.spot_detail.name }}
          </p>
          <p
            style="text-align: center"
            class="font-size-16 my-0 text-uppercase"
          >
            {{
              $utility.momentAddDate(
                data.time_in,
                "7",
                "hours",
                "YYYY-MM-DD hh:mm:ss ",
              )
            }}
            WIB
          </p>
          <p
            style="text-align: center"
            class="font-size-16 my-0 text-uppercase"
          >
            {{ data.pos_in }} | {{ data.vehicle_code }}
          </p>
        </div>

        <div style="text-align: center" class="text-center">
          <qrcode-vue
            :value="`${data.id}.${data.hs}.${data.time_in}.${data.vehicle_code}.${data.pos_in}.${helper.CONFIG.userId}`"
            :size="200"
            level="H"
            render-as="svg"
          />
        </div>
        <div style="text-align: center" class="text-center pb-1 mb-1">
          <p
            style="text-align: center"
            class="font-size-22 my-0 font-weight-bold"
          >
            {{ data.search_key }}
          </p>
          <p style="text-align: center" class="font-size-13 my-0">
            jangan tinggalkan tiket dan barang berharga di dalam kendaraan anda
          </p>
        </div>
      </div>
      <div class="text-center w-100">
        <div class="mt-1">
          <active-button
            additional_class="w-100"
            text="Print Tiket"
            @click="processPrintReceipt"
          />
        </div>
        <div class="mt-1">
          <active-button
            additional_class="w-100"
            variant="dark"
            text_color="dark"
            text="Lihat Tamu Lain"
            @click="$router.push('/guest/current')"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>
