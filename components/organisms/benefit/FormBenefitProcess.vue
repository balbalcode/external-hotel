<template>
  <div class="">
    <div class="row">
      <div class="col-12 d-none d-md-block col-lg-4">
        <div class="h-100 d-flex justify-content-center align-items-center">
          <div>
            <Lottie :options="defaultOptions" :width="198" :height="144" />
            <p
              class="font-weight-bold mt-n3 font-size-9 text-muted text-center"
            >
              Mohon tunggu, <br />Benefit sedang disiapkan...
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="d-flex align-items-top my-3">
          <div v-if="helper.currentProcess >= 2" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="helper.currentProcess === 1" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                helper.currentProcess >= 2
                  ? 'text-success'
                  : helper.currentProcess === 1
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan informasi pengunjung
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 2
                    ? "Berhasil menyimpan data informasi pengunjung mulai dari kendaraan, nama dan paket produk"
                    : helper.currentProcess === 1
                    ? "Sistem sedang menyimpan data informasi pengunjung mulai dari kendaraan, nama dan paket produk"
                    : "Menyimpan data informasi pengunjung mulai dari kendaraan, nama dan paket produk"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="helper.currentProcess >= 3" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="helper.currentProcess === 2" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                helper.currentProcess >= 3
                  ? 'text-success'
                  : helper.currentProcess === 2
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Merubah transaksi pengunjung sebelumnya
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 3
                    ? "Berhasil memberikan benefit free parkir kepada pengunjung"
                    : helper.currentProcess === 2
                    ? "Sistem sedang memberikan benefit free parkir kepada pengunjung"
                    : "Memberikan benefit free parkir kepada pengunjung"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="helper.currentProcess >= 6" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="helper.currentProcess === 4" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                helper.currentProcess >= 6
                  ? 'text-success'
                  : helper.currentProcess === 5
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan log informasi penjgunjung
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 6
                    ? "Berhasil menyimpan data log aktivitas aktivasi ke server"
                    : helper.currentProcess === 5
                    ? "Berhasil menyimpan data log aktivitas aktivasi ke server"
                    : "Menyimpan data log aktivitas aktivasi ke server"
                }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lottie from "vue-lottie";
import animationData from "~/static/loadingCard.json";
import {
  guestMethods,
  resolutionMethods,
  utilityMethods,
  configMethods,
} from "@/store/helperActions";

export default {
  components: {
    Lottie,
  },
  computed: {
    defaultOptions() {
      return {
        loop: true,
        autoplay: true,
        animationData: animationData,
      };
    },
  },
  props: {
    stepOne: {
      type: Object,
      required: true,
    },
    stepTwo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      membership: {},
      log: {},
      transactionId: "",
      helper: {
        vehicle: {},
        currentProcess: 1,
        CORPORATE: {},
        CONFIG: {},
      },
    };
  },
  async mounted() {
    this.transactionId = this.$utility.generateUUID();
    this.helper.CORPORATE = await this.$utility.getCorporateData();
    this.helper.CONFIG = await this.processGetConfig();
    this.helper.vehicle = await this.$utility.getFormattedVehicle();
    console.log(this.helper.vehicle, "vehicle type");
    this.startProcess();
  },
  methods: {
    getConfig: configMethods.getConfig,
    updateDataResolution: resolutionMethods.updateDataResolution,
    createGuest: guestMethods.createGuest,
    updateGuest: guestMethods.updateGuest,
    setDefaultSuccessAlert: utilityMethods.setDefaultSuccessAlert,

    nextProcess() {
      if (this.helper.currentProcess < 5) {
        this.helper.currentProcess++;
      }
    },

    setPayloadChangeTransaction() {
      return {
        transaction_id: this.stepOne.data.selectedTransaction.id,
        method: "add_membership",
        product_id: this.stepTwo.data.productId.productId,
        reason: `BENEFIT-${this.helper.CORPORATE.id}-${this.logger.id}`,
      };
    },

    setPayloadLogsTransactionCreate() {
      return {
        id: this.transactionId,
        guestCheckin: "",
        guestData: JSON.stringify(this.stepOne.data),
        guestName: this.stepTwo.data.name,
        corporateId: this.helper.CORPORATE.id,
        productId: this.stepTwo.data.productId.productId,
        guestCheckout: "",
        guestVehicleCode: this.processFindVehicleType(),
        type: "FREE_PARKING",
        ocrFile: "",
        ocrResult: "",
        transactionId: this.stepOne.data.selectedTransaction.id,
        status: "CREATION",
        membershipId: "",
        oldMembershipId: "",
        checkinTransactionId: "",
        rfid: "",
        meta: JSON.stringify({
          stepOne: this.stepOne,
          stepTwo: this.stepTwo,
        }),
        create_by: this.$utility.getUserLoggedIn().email,
      };
    },

    setPayloadLogsTransactionUpdate() {
      return {
        id: this.transactionId,
        membershipId: "",
        employeeId: "",
        status: "GIFTED",
      };
    },

    processFindVehicleType() {
      const found = this.helper.vehicle.find(
        (item) =>
          item.text === this.stepOne.data.selectedTransaction.vehicle_code,
      );
      return found ? found.value : "";
    },

    async processGetConfig() {
      try {
        const payload = {
          filter: [{ key: "corporateId", value: this.helper.CORPORATE.id }],
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
          `${error.message} at processGetConfig in FormGuestProcess`,
        );
        console.log(error, "processGetConfig in FormGuestProcess");
      } finally {
        this.helper.isLoading = false;
      }
    },

    async processChangeTransaction() {
      try {
        const PAYLOAD = this.setPayloadChangeTransaction();
        // await this.updateDataResolution(PAYLOAD);
        console.log(PAYLOAD, "payload change transaction");
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processChangeTransaction in FormGuestProcess`,
        );
        console.log(error, "processChangeTransaction in FormGuestProcess");
        throw error;
      }
    },

    async processCreateGuest() {
      try {
        const PAYLOAD = this.setPayloadLogsTransactionCreate();
        const { values } = await this.createGuest(PAYLOAD);
        this.logger = values[0];
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCreateGuest in FormGuestProcess`,
        );
        console.log(error, "processCreateGuest in FormGuestProcess");
        throw error;
      }
    },

    async processUpdateGuest() {
      try {
        const PAYLOAD = this.setPayloadLogsTransactionUpdate();
        await this.updateGuest(PAYLOAD);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processUpdateGuest in FormGuestProcess`,
        );
        console.log(error, "processUpdateGuest in FormGuestProcess");
        throw error;
      }
    },

    async startProcess() {
      try {
        await this.processCreateGuest();
        this.nextProcess();
        await this.processChangeTransaction();
        this.nextProcess();
        await this.processUpdateGuest();
        this.setDefaultSuccessAlert({
          message: "Penjgunjung berhasil mendapatkan benefit free parkir",
        });
        this.$emit("finish");
      } catch (error) {
        // WHAT SHOULD I DO HERE? bcs its rollbacking 3-4 process is complicated
      }
    },
  },
};
</script>

<style></style>
