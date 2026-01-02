<template>
  <div class="p-2" ref="formGuest">
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
    </div>
    <form-guest-room
      @submit="processStepOne"
      @cancel="passCancelToParent"
      v-if="helper.currentStep === 1 && helper.currentStep < 4"
    />
    <form-guest-information
      :data="form.stepOne"
      @submit="processStepTwo"
      @cancel="passCancelToParent"
      v-if="helper.currentStep > 1 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 2"
    />
    <form-guest-membership
      :data="form.stepTwo"
      @submit="processStepThree"
      @cancel="passCancelToParent"
      v-if="helper.currentStep > 2 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 3"
    />
    <form-guest-process
      v-if="helper.currentStep === 4"
      :saving-logs="saved"
      :step-one="form.stepOne"
      :step-two="form.stepTwo"
      :step-three="form.stepThree"
    />
  </div>
</template>

<script>

export default {
  components: {
    FormGuestInformation: () =>
      import("@/components/organisms/guest/FormGuestInformation"),
    FormGuestMembership: () =>
      import("@/components/organisms/guest/FormGuestMembership"),
    FormGuestRoom: () => import("@/components/organisms/guest/FormGuestRoom"),
    FormGuestProcess: () =>
      import("@/components/organisms/guest/FormGuestProcess"),
  },
  data: () => {
    return {
      form: {
        stepOne: {
          // ocrFile:
          //   "hotel/ocr-files/4a685e9e-c236-4850-85d1-a2534277cd65/29026c62-911e-41c5-b16b-f59e871d7af3.jpeg",
          // data: {
          //   room_number: "1001",
          //   guest_name: "DASWAND; SULTONI MR",
          //   arrival_date: "17/07/25",
          //   arrival_time: "21.03",
          //   departure_date: "19/07/25",
          //   departure_time: "12.00",
          //   card_type: "New Card (Guest)",
          // },
        },
        stepTwo: {
          // data: {
          //   name: "1001",
          //   vehicleType: "MB",
          //   start: "2025-07-17T00:00:00.000Z",
          //   end: "2025-07-19T00:00:00.000Z",
          //   licensePlate: "11",
          //   productId: {
          //     id: "aa8f40fb-e168-404a-8d93-7c20f871896f",
          //     corporateId: "0fcf3f74-f0aa-4b53-8d23-625ef4916dfc",
          //     name: "MK 2 HARI",
          //     label: "MK 2 HARI",
          //     productId: "7f29b8f0-eaec-4515-8eea-269dad4b648e",
          //     companyId: "0fcf3f74-f0aa-4b53-8d23-625ef4916dfc",
          //     created_at: 1765179344402,
          //     updated_at: 1765179344402,
          //     values: 2,
          //     period: "day",
          //   },
          //   guestInformation:
          //     '[{"label":"Room Number","isPrimary":true,"key":"room_number","object":"name","format":"string","mapped_value":"1001"},{"label":"Arrival Date","isPrimary":true,"key":"arrival_date","object":"start","format":"DD/MM/YY","mapped_value":"17/07/25"},{"label":"Departure Date","isPrimary":true,"key":"departure_date","object":"end","format":"DD/MM/YY","mapped_value":"19/07/25"}]',
          //   isSubmitted: true,
          // },
        },
        stepThree: {}, // transaction data
        stepFour: {}, // membership &  card reading { data, membershipData}
      },
      logger: {},
      helper: {
        isPassed: {
          stepOne: false,
          stepTwo: false,
          stepThree: false,
          stepFour: false,
        },
        saved: {
          membership: false,
          transactionId: false,
          creation: false,
          membership: false,
        },
        CORPORATE: {},
        currentStep: 1,
        isLoading: false,
        savingProcess: 0,
      },
    };
  },
  mounted() {
    this.helper.CORPORATE = this.$utility.getCorporateData();
  },
  methods: {

    processStepOne(data) {
      this.form.stepOne = data;
      this.helper.currentStep = 2;
    },

    processStepTwo(data) {
      this.form.stepTwo = data;
      this.helper.currentStep = 3;
    },

    processStepThree(data) {
      this.form.stepThree = data;
      this.helper.currentStep = 4;
    },
  },
};
</script>

<style></style>
