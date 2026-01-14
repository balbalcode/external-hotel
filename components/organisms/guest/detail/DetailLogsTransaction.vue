<template>
  <div>
    <div class="row mt-3" v-if="data.id">
      <div class="col-12 col-lg-12">
        <p class="font-weight-bold font-size-14 mb-0">Transaksi Tamu</p>
        <p class="font-size-11 text-secondary mb-2">
          Informasi kartu checkin dan checkout tamu selama menginap
        </p>
      </div>

      <div
        class="col-12 col-lg-4 cursor-pointer"
        @click="$emit('selected', transaction.transactionIn)"
        v-if="transaction.transactionIn.id"
      >
        <div class="rounded bg-light p-2 border">
          <div>
            <p class="my-0 font-weight-bold text-muted font-size-10">
              Tiket Masuk
              {{
                transaction.transactionIn.e_card_id ? "E-Money/Kartu" : "Karcis"
              }}
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mt-1 mb-2">
              <p class="my-0 font-weight-bold text-muted font-size-14">
                {{
                  processCheckVehicle(transaction.transactionIn)
                    ? "Mobil"
                    : "Motor"
                }}
                -
                {{ (transaction.transactionIn.license_plate) ? transaction.transactionIn.license_plate : 'N/A' }}
              </p>
              <p class="my-0 font-size-9">
                Waktu Masuk:
                {{
                  $utility.formatDateMoment(
                    transaction.transactionIn.time_in,
                    "DD-MM-YYYY hh:mm:ss"
                  )
                }}
              </p>
            </div>
            <div>
              <i class="ic-log-in-03 font-size-20 text-success"></i>
            </div>
          </div>
          <div>
            <p class="my-0 font-size-9 text-muted">
              <i class="ic-alert-circle"></i> Klik untuk melihat lebih lengkap
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4 cursor-pointer h-100" v-else>
        <div class="rounded bg-light p-2 border">
          <div
            class="d-flex justify-content-center flex-column align-items-center"
          >
            <div class="my-3 py-2">
              <b-spinner size="sm" />
            </div>
          </div>
        </div>
      </div>

      <div
        class="col-12 col-lg-4 cursor-pointer"
        v-if="transaction.transactionOut.id"
        @click="$emit('selected', transaction.transactionOut)"
      >
        <div class="rounded bg-light p-2 border">
          <div>
            <p class="my-0 font-weight-bold text-muted font-size-10">
              Tiket Keluar
              {{
                transaction.transactionOut.e_card_id
                  ? "E-Money/Kartu"
                  : "Karcis"
              }}
            </p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mt-1 mb-2">
              <p class="my-0 font-weight-bold text-muted font-size-14">
                {{
                  processCheckVehicle(transaction.transactionOut)
                    ? "Mobil"
                    : "Motor"
                }}
                -
                {{ transaction.transactionOut.license_plate }}
              </p>
              <p class="my-0 font-size-9">
                Waktu Keluar:
                {{
                  $utility.formatDateMoment(
                    transaction.transactionOut.time_out,
                    "DD-MM-YYYY hh:mm:ss"
                  )
                }}
              </p>
            </div>
            <div>
              <i class="ic-log-out-03 font-size-20 text-danger"></i>
            </div>
          </div>
          <div>
            <p class="my-0 font-size-9 text-muted">
              <i class="ic-alert-circle"></i> Klik untuk melihat lebih lengkap
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-4 cursor-pointer h-100" v-else>
        <div class="rounded bg-light p-2 border">
          <div>
            <p class="my-0 font-weight-bold text-muted font-size-10">
              Tiket Keluar (Karcis)
            </p>
          </div>
          <div
            class="d-flex justify-content-center flex-column align-items-center"
          >
            <div class="mt-2">
              <i class="ic-alert-circle font-size-20"></i>
            </div>
            <div class="font-size-11 mb-2 text-muted">Tiket belum dibuat</div>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import { resolutionMethods } from "@/store/helperActions";
export default {
  props: {
    data: {
      required: true,
    },
  },
  data() {
    return {
      transaction: {
        transactionIn: {},
        transactionOut: {},
      },
      helper: {
        loading: {
          transactionIn: false,
          transactionOut: false,
        },
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal.id) {
          this.processSearchTransaction(
            this.setPayloadTransaction("transactionId"),
            "transactionIn"
          );
          if (this.data.status === "CHECKEDOUT") {
            this.processSearchTransaction(
              this.setPayloadTransaction("checkoutTransactionId"),
              "transactionOut"
            );
          }
        }
      },
    },
  },
  mounted() {
    if (this.data.id) {
      this.processSearchTransaction(
        this.setPayloadTransaction("transactionId"),
        "transactionIn"
      );
      if (this.data.status === "CHECKEDOUT") {
        this.processSearchTransaction(
          this.setPayloadTransaction("checkoutTransactionId"),
          "transactionOut"
        );
      }
    }
  },
  methods: {
    getDataResolution: resolutionMethods.getDataResolution,

    setPayloadTransaction(transactionId) {
      let payload = {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "values", value: this.data[`${transactionId}`] },
          { key: "type", value: "id" },
        ],
      };

      return payload;
    },

    processCheckVehicle(transaction) {
      const vehicle = String(transaction.vehicle_code ?? "MT2").toLowerCase();

      if (vehicle.includes("mb")) {
        return true;
      } else {
        return false;
      }
    },

    processEmitToParent() {
      this.$emit("update", this.transaction);
    },

    async processSearchTransaction(payload, loaderTarget) {
      try {
        this.helper.loading[`${loaderTarget}`] = true;
        const { values } = await this.getDataResolution(payload);
        this.transaction[`${loaderTarget}`] = values[0];
        this.processEmitToParent();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchTransaction-${loaderTarget} in DetailLogsTransaction`
        );
      } finally {
        this.helper.loading[`${loaderTarget}`] = false;
      }
    },
  },
};
</script>

<style></style>
