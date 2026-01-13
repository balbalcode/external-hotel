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
                Menyimpan informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 2
                    ? "Berhasil menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : helper.currentProcess === 1
                    ? "Sistem sedang menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
                    : "Menyimpan data informasi tamu mulai dari nomor kamar, nama, dan waktu check-in ke server"
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
                Menyimpan informasi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 3
                    ? "Berhasil menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : helper.currentProcess === 2
                    ? "Sistem sedang menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                    : "Menyimpan data log informasi kendaraan tamu seperti nomor plat, jenis kendaraan, dan waktu masuk ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="helper.currentProcess >= 4" class="text-success">
            <i class="bx bx-check-circle font-size-20"></i>
          </div>
          <div v-else-if="helper.currentProcess === 3" class="text-dark">
            <i class="bx bx-loader-alt bx-spin font-size-20"></i>
          </div>
          <div v-else class="text-secondary">
            <i class="bx bx-circle font-size-20"></i>
          </div>
          <div class="ml-2 mt-0">
            <p
              class="font-size-13 mt-n1 mb-0"
              :class="
                helper.currentProcess >= 4
                  ? 'text-success'
                  : helper.currentProcess === 3
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menghubungkan transaksi kendaraan
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 4
                    ? "Berhasil menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : helper.currentProcess === 3
                    ? "Sistem sedang menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                    : "Menyimpan data log informasi transaksi yang digunakan oleh tamu sebelumnya ke server"
                }}
              </span>
            </p>
          </div>
        </div>

        <div class="d-flex align-items-top my-3">
          <div v-if="helper.currentProcess >= 5" class="text-success">
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
                helper.currentProcess >= 5
                  ? 'text-success'
                  : helper.currentProcess === 4
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Membuat transaksi masuk
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 5
                    ? "Berhasil membuet transaksi masuk untuk kendaraan tamu di sistem"
                    : helper.currentProcess === 4
                    ? "Sistem sedang membuet transaksi masuk untuk kendaraan tamu di sistem"
                    : "membuet transaksi masuk untuk kendaraan tamu di sistem"
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
                  : helper.currentProcess === 4
                  ? 'text-dark'
                  : 'text-secondary'
              "
            >
              <span class="d-block font-weight-bold">
                Menyimpan log informasi tamu
              </span>
              <span class="d-block font-size-9">
                {{
                  helper.currentProcess >= 6
                    ? "Berhasil menyimpan data log aktivitas aktivasi ke server"
                    : helper.currentProcess === 4
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
import {
  guestMethods,
  resolutionMethods,
  transactionMethods,
  utilityMethods,
} from "@/store/helperActions";

import md5 from "md5";

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
      membership: {},
      log: {},
      transactionId: "",
      helper: {
        currentProcess: 1,
        CORPORATE: {},
        authTransaction: {},
      },
    };
  },
  mounted() {
    this.transactionId = this.$utility.generateUUID();
    this.helper.CORPORATE = this.$utility.getCorporateData();
    this.startProcess();
  },
  methods: {
    updateDataResolution: resolutionMethods.updateDataResolution,
    createMembership: guestMethods.createMembership,
    createEmployee: guestMethods.createEmployee,
    createGuest: guestMethods.createGuest,
    updateGuest: guestMethods.updateGuest,
    createTransaction: transactionMethods.createTransaction,
    authTransaction: transactionMethods.authTransaction,
    setDefaultSuccessAlert: utilityMethods.setDefaultSuccessAlert,

    nextProcess() {
      if (this.helper.currentProcess < 5) {
        this.helper.currentProcess++;
      }
    },

    setPayloadAuthTransaction() {
      return {
        spot_id: this.$utility.getSpotId(),
        corporate_id: this.$utility.getCorporateId(),
        secret_key: "f2e8d7ccf4454f77a164847587aa8310",
      };
    },

    setPayloadCreateTransaction() {
      const transactionId = this.transactionId;
      const handshake = md5(
        `${transactionId}.${this.$utility.getSpotId()}.f2e8d7ccf4454f77a164847587aa8310`
      );

      return {
        token: this.helper.authTransaction.access_token,
        image: "",
        user_id: "7166aa38-e193-4134-8a52-18f784baa43f",
        spot_id: this.$utility.getSpotId(),
        transaction_id: transactionId,
        handshake: handshake,
        rf_id: this.stepThree.data.rfId,
        membership_id: this.membership.id,
        pos_in: "",
        vehicle_code: this.processConvertVehicleType("MT1"),
        gate_code: "",
        created_at: new Date().getTime(),
        time_in: this.stepThree.data.selectedTransaction.time_in,
        source: "HOTEL_GUEST",
      };
    },

    setPayloadCancelTransaction() {
      return {
        transaction_id: this.stepThree.data.selectedTransaction.id,
        method: "flag_problem",
        reason: `TAMU_HOTEL-${this.helper.CORPORATE.id}-${this.logger.id}`,
      };
    },

    setPayloadCreationMembership() {
      return {
        id: "",
        spot_id: this.$utility.getSpotId(),
        name: `${this.helper.CORPORATE.name} - ${this.stepThree.data.rfId}`,
        identification_number: "",
        email: "",
        phone_number: "",
        company_id: this.$utility.getCompanyId(),
        status: true,
        motorcycle: [],
        card: {
          card_id: this.stepThree.data.rfId,
          rf_id: this.stepThree.data.rfId,
          product_id: this.stepTwo.data.productId.productId,
          license_plate: this.stepTwo.data.licensePlate,
          second_license_plate: "",
          start: this.$utility.formatDateMoment(
            this.stepThree.data.selectedTransaction.time_in,
            "YYYY-MM-DD HH:mm:ss"
          ),
          hour_start: this.$utility.formatDateMoment(
            this.stepThree.data.selectedTransaction.time_in,
            "HH:mm:ss"
          ),
          reference: "HOTEL-GUEST-TRANSACTION",
          payment_method: "INVOICE",
          payment_receipt: this.stepOne.ocrFile,
          paid_date: this.$utility.formatDateMoment(
            new Date(),
            "YYYY-MM-DD HH:mm:ss"
          ),
        },
      };
    },

    setPayloadExtendMembership() {
      return {
        card_id: this.stepThree.data.rfId,
        rf_id: this.stepThree.data.rfId,
        product_id: this.stepTwo.data.productId.productId,
        employee_id: this.stepThree.data.selectedMembership.employee_detail.id,
        license_plate: this.stepThree.data.licensePlate,
        second_license_plate: "",
        start: this.$utility.formatDateMoment(
          this.stepThree.data.selectedTransaction.time_in,
          "YYYY-MM-DD HH:mm:ss"
        ),
        hour_start: this.$utility.formatDateMoment(
          this.stepThree.data.selectedTransaction.time_in,
          "HH:mm:ss"
        ),
        reference: "HOTEL-GUEST-TRANSACTION",
        payment_method: "INVOICE",
        payment_receipt: this.stepOne.ocrFile,
        paid_date: this.$utility.formatDateMoment(
          new Date(),
          "YYYY-MM-DD HH:mm:ss"
        ),
      };
    },

    setPayloadLogsTransactionCreate() {
      return {
        id: this.transactionId,
        guestCheckin: this.stepTwo.data.start,
        guestName: this.stepTwo.data.name,
        corporateId: this.helper.CORPORATE.id,
        guestCheckout: this.stepTwo.data.end,
        type: "HOTEL_GUEST",
        ocrFile: this.stepOne.ocrFile,
        ocrResult: this.stepOne.data,
        transactionId: this.stepThree.data.selectedTransaction.id,
        membershipId: "",
        oldMembershipId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.id
          : "",
        employeeId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.employee_detail.id
          : "",
        checkinTransactionId: this.transactionId,
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
        id: this.transactionId,
        guestCheckin: this.stepTwo.data.start,
        guestName: this.stepTwo.data.name,
        corporateId: this.helper.CORPORATE.id,
        guestCheckout: this.stepTwo.data.end,
        type: "HOTEL_GUEST",
        ocrFile: this.stepOne.ocrFile,
        ocrResult: this.stepOne.data,
        transactionId: this.stepThree.data.selectedTransaction.id,
        membershipId: this.membership.id,
        oldMembershipId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.id
          : "",
        employeeId: !this.stepThree.data.isNewMembership
          ? this.stepThree.data.selectedMembership.employee_detail.id
          : "",
        checkinTransactionId: this.transactionId,
        rfId: this.stepThree.data.rfId,
        meta: JSON.stringify({
          stepOne: this.stepOne,
          stepTwo: this.stepTwo,
          stepThree: this.stepThree,
        }),
      };
    },

    processConvertVehicleType(vehicle) {
      vehicle = vehicle.toUpperCase();
      let result = `${vehicle[0]}${vehicle[1]}2`; // DEVELOP SOON
      return result.toUpperCase();
    },

    async processAuthTransaction() {
      try {
        const PAYLOAD_AUTH = this.setPayloadAuthTransaction();
        const { values } = await this.authTransaction(PAYLOAD_AUTH);
        this.helper.authTransaction = values;
        await this.processCreateTransaction();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processAuthTransaction in FormGuestProcess`
        );
        throw error;
      }
    },

    async processCreateTransaction() {
      try {
        const PAYLOAD = this.setPayloadCreateTransaction();
        await this.createTransaction(PAYLOAD);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processAuthTransaction in FormGuestProcess`
        );
        throw error;
      }
    },

    async processCancelTransaction() {
      try {
        const PAYLOAD = this.setPayloadCancelTransaction();
        await this.updateDataResolution(PAYLOAD);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCancelTransaction in FormGuestProcess`
        );
        throw error;
      }
    },

    async processExtendMembership() {
      try {
        const PAYLOAD = this.setPayloadExtendMembership();
        const { values } = await this.createMembership(PAYLOAD);
        this.membership = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processExtendMembership in FormGuestProcess`
        );
        throw error;
      }
    },

    async processCreateMembership() {
      try {
        const PAYLOAD = this.setPayloadCreationMembership();
        const { values } = await this.createEmployee(PAYLOAD);
        this.membership = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCreateMembership in FormGuestProcess`
        );
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
          `${error.message} at processCreateGuest in FormGuestProcess`
        );
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
          `${error.message} at processUpdateGuest in FormGuestProcess`
        );
        throw error;
      }
    },

    async startProcess() {
      try {
        await this.processCreateGuest();
        this.nextProcess();
        await this.processCancelTransaction();
        this.nextProcess();
        if (this.stepThree.data.isNewMembership) {
          await this.processCreateMembership();
        } else {
          await this.processExtendMembership();
          alert("extend!");
        }
        this.nextProcess();
        await this.processAuthTransaction();
        this.nextProcess();
        await this.processUpdateGuest();
        this.setDefaultSuccessAlert({
          message: "Tamu berhasil ditambahkan",
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
