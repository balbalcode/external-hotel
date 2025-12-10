<template>
  <div class="p-2">
    <div class="d-flex">
      <div class="mt-1">
        <i
          class="ic-user-plus-02 font-size-20 text-info rounded-circle"
          style="
            background-color: #a6cdfe;
            border: 6px solid #cfe4ff;
            padding: 6px;
          "
        >
        </i>
      </div>
      <div class="ml-2">
        <h5 class="font-weight-bold my-0">Buat Tamu Baru</h5>
        <p class="my-0 font-size-12 text-secondary">
          Isi data tamu dengan benar dan lengkap
        </p>
      </div>

      <form-guest-room
        @submit="processStepOne"
        @cancel="passCancelToParent"
        v-if="helper.currentStep === 1"
      />
      <form-guest-information
        :data="form.stepOne"
        @submit="processStepTwo"
        @cancel="passCancelToParent"
        :is-passed="helper.currentStep > 2"
      />
    </div>
    <div></div>
  </div>
</template>

<script>
import { guestMethods } from "@/store/helperActions";

export default {
  components: {
    FormGuestInformation: () =>
      import("@/components/organisms/guest/FormGuestInformation"),
    FormGuestRoom: () => import("@/components/organisms/guest/FormGuestRoom"),
  },
  data: () => {
    return {
      form: {
        stepOne: {}, // ocr file upload { ocrFile, ocrResult}
        stepTwo: {}, // matching result {based }
        stepThree: {}, // transaction data
        stepFour: {}, // membership &  card reading { data, membershipData}
      },
      logger: {},
      helper: {
        CORPORATE: {},
        currentStep: 1,
        isLoading: false,
      },
    };
  },
  mounted() {
    this.helper.CORPORATE = this.$utility.getCorporateData();
  },
  methods: {
    createMembership: guestMethods.createMembership,
    getEmployeeDetail: guestMethods.getEmployeeDetail,
    createEmployee: guestMethods.createEmployee,

    processStepOne(data) {
      this.form.stepOne = data;
      this.helper.currentStep = 2;
    },

    processStepTwo(data) {
      this.form.stepTwo = data;
      this.helper.currentStep = 3;
    },

    setPayloadTransaction() {
      return {
        transaction_id: this.form.stepThree.transaction_id,
        method: "flag_problem",
        reason: `TAMU_HOTEL-${this.helper.CORPORATE.id}-${this.logger.id}`,
      };
    },

    setPayloadCreationMembership() {
      return {
        spot_id: this.$utility.getSpotId(),
        name: `${this.helper.CORPORATE.name} - ${this.form.stepFour.data.rfid}`,
        identification_number: this.form.identification_number.trim(),
        email: "",
        phone_number: "",
        company_id: this.$utility.getCompanyId(),
        status: true,
        motorcycle: [],
        card: {
          card_id: this.form.stepFour.data.cardId,
          rf_id: this.form.stepFour.data.rfiId,
          product_id: this.form.stepFour.data.productId.id,
          employee_id: this.form.stepFour.data.employeeId,
          license_plate: this.form.stepFour.data.licensePlate,
          start: this.$utility.formatDateMoment(
            this.form.stepFour.data.start,
            "YYYY-MM-DD HH:mm:ss"
          ),
          hour_start: this.form.stepFour.data.hourStart,
          reference: "HOTEL-GUEST-TRANSACTION",
          payment_method: "INVOICE",
          payment_receipt: "",
          paid_date: "",
        },
      };
    },

    setPayloadExtendMembership() {
      return {
        card_id: this.form.stepFour.data.cardId,
        rf_id: this.form.stepFour.data.rfiId,
        product_id: this.form.stepFour.data.productId.id,
        employee_id: this.form.stepFour.data.employeeId,
        license_plate: this.form.stepFour.data.licensePlate,
        start: this.$utility.formatDateMoment(
          this.form.stepFour.data.start,
          "YYYY-MM-DD HH:mm:ss"
        ),
        hour_start: this.form.stepFour.data.hourStart,
        reference: "HOTEL-GUEST-TRANSACTION",
        payment_method: "INVOICE",
        payment_receipt: "",
        paid_date: "",
      };
    },

    passCancelToParent() {
      this.$emit("cancel");
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

    processSaveMembership() {
      if (this.form.stepFour.membershipData.id) {
      } else {
      }
    },

    async processSubmitData() {
      await this.processSaveMembership();
    },

    // 3 steps to saving:
    //   -> save data
    //   -> cancel transaction / change to x
    //   -> create log for audit trail (serverless)
    //   -> create membership with card which get
  },
};
</script>

<style></style>
