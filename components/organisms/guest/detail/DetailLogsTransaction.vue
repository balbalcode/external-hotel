<template>
  <div class="">
    <div class="row" v-if="data.id">
      <div class="col-12 col-lg-9 mb-3">
        <p class="font-weight-bold font-size-16 mb-0">Transaksi Tamu</p>
        <p class="font-size-13 text-secondary mb-0">
          Informasi kartu checkin dan checkout tamu selama menginap
        </p>
      </div>
      <div class="col-12 col-lg-3 text-right mb-3">
        <div
          class="d-flex flex-column align-items-end h-100 justify-content-center"
        >
          <active-button
            @click="modal.ocr = true"
            text="Refresh"
            type="outline"
            variant="secondary"
            size="sm"
            icon="ic-refresh-ccw-05"
          />
        </div>
      </div>

      <div class="d-flex px-3">
        <div class="bg-white mr-2">
          <div
            class="d-flex rounded border overflow-hidden"
            @click="$emit('selected', transaction.transactionIn)"
            v-if="transaction.transactionIn.id"
          >
            <div
              class="bg-info border-right border-info rounded-lg"
              style="border-right: 3px solid var(--info) #333"
            ></div>
            <div
              class="d-flex align-items-center justify-content-center px-2 my-1"
            >
              <i
                class="ic-log-in-03 font-size-24 text-info rounded-circle"
                style="
                  background-color: #a6cdfe;
                  border: 3px solid #cfe4ff;
                  padding: 8px 12px;
                "
              >
              </i>
            </div>
            <div class="px-2 py-2">
              <div
                class="rounded bg-info-90 text-info font-size-10 px-3 py-1 d-inline"
              >
                CHECK-IN
              </div>
              <div class="mt-2">
                <p class="my-0 font-size-11">Tanggal Masuk:</p>
                <p class="font-weight-bold font-size-14 mt-n1 mb-2">
                  {{
                    $utility.formatDateMoment(
                      transaction.transactionIn.time_in,
                      "DD-MM-YYYY HH:mm:ss",
                    )
                  }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mr-4">
                  <p class="my-1 font-size-10">Kode Tiket</p>
                  <p class="my-1">
                    <span
                      class="rounded bg-info-90 text-dark font-weight-bold text-uppercase font-size-10 p-1 d-inline"
                    >
                      {{
                        transaction.transactionIn.id
                          ? transaction.transactionIn.id.substring(0, 6)
                          : "N/A"
                      }}
                    </span>
                  </p>
                </div>

                <div class="mr-4">
                  <p class="my-1 font-size-10">Kendaraan</p>
                  <p class="my-1">
                    {{
                      processCheckVehicle(transaction.transactionIn)
                        ? "Mobil"
                        : "Motor"
                    }}
                  </p>
                </div>
                <div class="mr-4">
                  <p class="my-1 font-size-10">Plat Nomor</p>
                  <p class="my-1">
                    {{
                      transaction.transactionIn.license_plate
                        ? transaction.transactionIn.license_plate
                        : "N/A"
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-else>
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
        </div>

        <div class="">
          <div
            class="d-flex align-items-center justify-content-center h-100 px-3"
          >
            <i class="ic-arrow-right font-size-26 text-secondary"></i>
          </div>        
        </div>

        <div class="bg-white">
          <div
            class="d-flex rounded border overflow-hidden"
            @click="$emit('selected', transaction.transactionOut)"
            v-if="transaction.transactionOut.id"
          >
            <div
              class="bg-danger border-right border-danger rounded-lg"
              style="border-right: 3px solid var(--danger) #333"
            ></div>
            <div
              class="d-flex align-items-center justify-content-center px-2 my-1"
            >
              <i
                class="ic-log-out-02 font-size-24 text-danger rounded-circle"
                style="
                  background-color: #fc8d93;
                  border: 3px solid #fad4d6;
                  padding: 8px 12px;
                "
              >
              </i>
            </div>
            <div class="px-2 py-2">
              <div
                class="rounded bg-danger-90 text-danger font-size-10 px-3 py-1 d-inline"
              >
                CHECK-OUT
              </div>
              <div class="mt-2">
                <p class="my-0 font-size-11">Tanggal Keluar:</p>
                <p class="font-weight-bold font-size-14 mt-n1 mb-2">
                  {{
                    $utility.formatDateMoment(
                      transaction.transactionOut.time_out,
                      "DD-MM-YYYY HH:mm:ss",
                    )
                  }}
                </p>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mr-4">
                  <p class="my-1 font-size-10">Kode Tiket</p>
                  <p class="my-1">
                    <span
                      class="rounded bg-danger-90 text-dark font-weight-bold text-uppercase font-size-10 p-1 d-inline"
                    >
                      {{
                        transaction.transactionOut.id
                          ? transaction.transactionOut.id.substring(0, 6)
                          : "N/A"
                      }}
                    </span>
                  </p>
                </div>

                <div class="mr-4">
                  <p class="my-1 font-size-10">Kendaraan</p>
                  <p class="my-1">
                    {{
                      processCheckVehicle(transaction.transactionOut)
                        ? "Mobil"
                        : "Motor"
                    }}
                  </p>
                </div>
                <div class="mr-4">
                  <p class="my-1 font-size-10">Plat Nomor</p>
                  <p class="my-1">
                    {{
                      transaction.transactionOut.license_plate
                        ? transaction.transactionOut.license_plate
                        : "N/A"
                    }}
                  </p>
                </div>
              </div>
            </div>
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
  components: {
    ActiveButton: () => import("@/components/atoms/button/ActiveButton"),
  },
  watch: {
    data: {
      immediate: true,
      handler(newVal) {
        if (newVal.id) {
          this.processSearchTransaction(
            this.setPayloadTransaction("transactionId"),
            "transactionIn",
          );
          if (this.data.status === "CHECKEDOUT") {
            this.processSearchTransaction(
              this.setPayloadTransaction("checkoutTransactionId"),
              "transactionOut",
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
        "transactionIn",
      );
      if (this.data.status === "CHECKEDOUT") {
        this.processSearchTransaction(
          this.setPayloadTransaction("checkoutTransactionId"),
          "transactionOut",
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
          `${error.message} at processSearchTransaction-${loaderTarget} in DetailLogsTransaction`,
        );
      } finally {
        this.helper.loading[`${loaderTarget}`] = false;
      }
    },
  },
};
</script>

<style></style>
