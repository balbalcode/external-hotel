<template>
  <div>
    <div v-if="data.id">
      <div class="row mt-4">
        <div class="col-12 col-lg-12">
          <p class="font-weight-bold font-size-14 mb-0">
            Riwayat Pengunaan Kartu
          </p>
          <p class="font-size-11 text-secondary mb-2">
            Daftar riwayat penggunaan kartu oleh tamu selama menginap di hotel.
          </p>
        </div>
      </div>

      <content-table-view
        :length="transaction.length"
        :is_loading="helper.isLoading"
        :is_error="helper.isError"
      >
        <div class="rounded border p-0 overflow-hidden w-100">
          <div class="row m-0">
            <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
              Kode Transaksi
            </div>
            <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
              Waktu Masuk
            </div>
            <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
              Waktu Keluar
            </div>
            <div class="col-12 col-lg-2 bg-light p-2 font-weight-bold">
              Status
            </div>
            <div class="col-12 col-lg-1 bg-light p-2 font-weight-bold">
              Detail
            </div>
          </div>
          <div
            class="row m-0"
            v-for="(item, index) in transaction"
            :key="index"
          >
            <div class="col-12 col-lg-3 p-2">
              {{ item.id }}
            </div>
            <div class="col-12 col-lg-3 p-2">
              {{
                $utility.formatDateMoment(item.time_in, "DD-MM-YYYY HH:mm:ss")
              }}
            </div>
            <div class="col-12 col-lg-3 p-2">
              {{
                $utility.formatDateMoment(item.time_out, "DD-MM-YYYY HH:mm:ss")
              }}
            </div>
            <div class="col-12 col-lg-2 p-2">
              <span>
                {{
                  options
                    .TRANSACTION_STATUS()
                    .filter((opt) => item.status === opt.value)[0].text
                }}</span
              >
            </div>
            <div class="col-12 col-lg-1 p-2">
              <button
                class="btn btn-sm btn-primary"
                @click="$emit('selected', item)"
              >
                Lihat
              </button>
            </div>
          </div>
        </div>
      </content-table-view>
    </div>
  </div>
</template>

<script>
import { resolutionMethods } from "@/store/helperActions";
import constant from "@/constants/resolution-center";
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    OverviewLabel: () => import("@utilities/atoms/label/OverviewLabel"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
  },
  data: () => ({
    transaction: [],
    helper: {
      isLoading: false,
      isError: false,
    },
    options: {
      TRANSACTION_STATUS: constant.TRANSACTION_STATUS,
    },
  }),
  props: {
    data: {
      required: true,
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        if (value.id) {
          this.processSearchTransaction();
        }
      },
    },
  },
  mounted() {
    if (this.data.id) {
      this.processSearchTransaction();
    }
  },
  methods: {
    getDataResolution: resolutionMethods.getDataResolution,
    setPayloadTransaction() {
      let payload = {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: this.data.rfid },
          { key: "type", value: "rfid" },
        ],
        pagination: {
          page: 1,
          per_page: 1000,
        },
      };
      return payload;
    },

    processFilterData(data) {
      const start = this.data.created_at;
      const end = this.data.checkoutCreatedAt;

      this.transaction = data.filter((item) => {
        const timeIn = item.time_in;
        if (end !== 0) return start <= timeIn && timeIn <= end;
        else return start <= timeIn;
      });
    },

    async processSearchTransaction() {
      try {
        this.helper.isLoading = true;
        const payload = this.setPayloadTransaction();
        const { values } = await this.getDataResolution(payload);
        this.processFilterData(values);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction- in DetailLogsTransaction`,
        );
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
