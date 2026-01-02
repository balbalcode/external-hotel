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
              Mohon tunggu, <br />Kartu sedang disiapkan...
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 2" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 1" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 2
                  ? 'text-success'
                  : currentProcess === 1
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 2
                    ? "Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : currentProcess === 1
                    ? "Sistem sedang menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : "Menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 3" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 2" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 3
                  ? 'text-success'
                  : currentProcess === 2
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan informasi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 3
                    ? "Berhasil menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : currentProcess === 2
                    ? "Sistem sedang menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : "Menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 4" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 3" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 4
                  ? 'text-success'
                  : currentProcess === 3
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menghubungkan transaksi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 4
                    ? "Berhasil menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : currentProcess === 3
                    ? "Sistem sedang menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : "Menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="currentProcess >= 4" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="currentProcess === 3" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                currentProcess >= 4
                  ? 'text-success'
                  : currentProcess === 3
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan log informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  currentProcess >= 4
                    ? "Berhasil menyimpan data log aktivitas aktivasi ke server"
                    : currentProcess === 3
                    ? "Sistem sedang menyimpan data log aktivitas aktivasi ke server"
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
import animationData from "~/static/animationData.json";
import { guestMethods } from "@/store/helperActions";

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
    stepThree: {
      type: Object,
      required: true,
    },
  },
  data() {
    // Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server -> create log
    // Berhasil menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server -> change transaction
    // Berhasil menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server -> update member / create member
    // Berhasil menyimpan data log aktivitas aktivasi ke server -> update log
    return {
      currentProcess: 0,
    };
  },
  methods: {
    createMembership: guestMethods.createMembership,
    createEmployee: guestMethods.createEmployee,

    nextProcess() {
      if (this.currentProcess < 5) {
        this.currentProcess++;
      }
    },

    setPayloadTransaction() {
      return {
        transaction_id: this.stepThree.transaction_id,
        method: "flag_problem",
        reason: `TAMU_HOTEL-${this.helper.CORPORATE.id}-${this.logger.id}`,
      };
    },

    setPayloadCreationMembership() {
      return {
        spot_id: this.$utility.getSpotId(),
        name: `${this.helper.CORPORATE.name} - ${this.stepFour.data.rfId}`,
        identification_number: this.identification_number.trim(),
        email: "",
        phone_number: "",
        company_id: this.$utility.getCompanyId(),
        status: true,
        motorcycle: [],
        card: {
          card_id: this.stepFour.data.cardId,
          rf_id: this.stepFour.data.rfId,
          product_id: this.stepTwo.data.productId.id,
          employee_id: this.stepFour.data.employeeId,
          license_plate: this.stepFour.data.licensePlate,
          start: this.$utility.formatDateMoment(
            this.stepFour.data.start,
            "YYYY-MM-DD HH:mm:ss"
          ),
          hour_start: this.stepFour.data.hourStart,
          reference: "HOTEL-GUEST-TRANSACTION",
          payment_method: "INVOICE",
          payment_receipt: "",
          paid_date: "",
        },
      };
    },

    setPayloadExtendMembership() {
      return {
        card_id: this.stepFour.data.cardId,
        rf_id: this.stepFour.data.rfId,
        product_id: this.stepTwo.data.productId.id,
        employee_id: this.stepFour.data.employeeId,
        license_plate: this.stepFour.data.licensePlate,
        start: this.$utility.formatDateMoment(
          this.stepFour.data.start,
          "YYYY-MM-DD HH:mm:ss"
        ),
        hour_start: this.stepFour.data.hourStart,
        reference: "HOTEL-GUEST-TRANSACTION",
        payment_method: "INVOICE",
        payment_receipt: "",
        paid_date: "",
      };
    },

    setPayloadLogsTransactionCreate() {
      // this is the first step before saving or subitting all data (TRX START)
      return {
        guestRoom: this.stepTwo.data.name,
        guestCheckin: this.stepTwo.data.start,
        guestCheckout: this.stepTwo.data.end,
        type: "HOTEL_GUEST", // HOTEL_GUEST / HOTEL_BENEFIT
        ocrFile: this.stepOne.ocrFile,
        ocrResult: this.stepOne.data,
        transactionId: this.stepThree.data.selectedTransaction.id,
        membershipId: "", // WILL BE FILLED AFTER CREATING MEMBERSHIP
        oldMembershipId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.id
          : "",
        employeeId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.employee_id
          : "",
        rfId: this.stepThree.data.rfId,
        meta: JSON.stringify({
          stepOne: this.stepOne,
          stepTwo: this.stepTwo,
          stepThree: this.stepThree,
        }),
      };
    },

    setPayloadLogsTransactionUpdate() {
      return {
        id: this.logger.id,
        membershipId: this.stepFour.data.id,
      };
    },

    async processCancelTransaction() {
      this.helper.isLoading = true;
      const PAYLOAD = this.setPayloadTransaction();
      try {
        await guestMethods.processTransactionFlag(PAYLOAD);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCancelTransaction in FormGuest`
        );
      } finally {
        this.helper.isLoading = false;
      }
    },

    async processExtendMembership() {
      const PAYLOAD = this.setPayloadExtendMembership();
      try {
        await guestMethods.processExtendMembership(PAYLOAD);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processExtendMembership in FormGuest`
        );
      }
    },

    async processSubmitData() {
      await this.processSaveMembership();
    },
  },
};
</script>

<style></style>
