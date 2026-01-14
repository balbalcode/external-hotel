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
        <div class="rounded border p-0 overflow-hidden">
          <div class="row m-0">
            <div class="col-12 col-lg-2 bg-light p-2 font-weight-bold">
              Kode Transaksi
            </div>
            <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
              Waktu Masuk
            </div>
            <div class="col-12 col-lg-3 bg-light p-2 font-weight-bold">
              Waktu Keluar
            </div>
            <div class="col-12 col-lg-1 bg-light p-2 font-weight-bold">
              Status
            </div>
            <div class="col-12 col-lg-2 bg-light p-2 font-weight-bold">
              Kendaraan
            </div>
            <div class="col-12 col-lg-1 bg-light p-2 font-weight-bold">
              Detail
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 col-lg-2 p-2">item.exitDoor</div>
            <div class="col-12 col-lg-3 p-2">item.entryTime</div>
            <div class="col-12 col-lg-3 p-2">item.exitTime</div>
            <div class="col-12 col-lg-1 p-2">
              <span> item.status</span>
            </div>
            <div class="col-12 col-lg-2 p-2">item.entryDoor</div>
            <div class="col-12 col-lg-1 p-2">
              <button class="btn btn-sm btn-primary">Lihat</button>
            </div>
          </div>
          <div class="row m-0">
            <div class="col-12 col-lg-2 p-2">item.exitDoor</div>
            <div class="col-12 col-lg-3 p-2">item.entryTime</div>
            <div class="col-12 col-lg-3 p-2">item.exitTime</div>
            <div class="col-12 col-lg-1 p-2">
              <span> item.status</span>
            </div>
            <div class="col-12 col-lg-2 p-2">item.entryDoor</div>
            <div class="col-12 col-lg-1 p-2">
              <button class="btn btn-sm btn-primary">Lihat</button>
            </div>
          </div>
        </div>
      </content-table-view>
    </div>
  </div>
</template>

<script>
import { resolutionMethods } from "@/store/helperActions";
export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
  },
  data: () => ({
    transaction: [],
    helper: {
      isLoading: false,
      isError: false,
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
          { key: "type", value: "rf_id" },
        ],
        pagination: {
          page: 1,
          per_page: 1000,
        },
      };
      return payload;
    },

    async processSearchTransaction() {
      try {
        this.helper.isLoading = true;
        const payload = this.setPayloadTransaction();
        const { values } = await this.getDataResolution(payload);
        this.transaction = values;
      } catch (error) {
        console.log(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction- in DetailLogsTransaction`
        );
      } finally {
        this.helper.isLoading = false;
      }
    },
  },
};
</script>

<style></style>
