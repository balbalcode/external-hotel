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
      v-if="helper.currentStep === 1 && helper.currentStep < 4"
    />
    <form-guest-information
      :data="form.stepOne"
      @submit="processStepTwo"
      v-if="helper.currentStep > 1 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 2"
    />
    <form-guest-membership
      :data="form.stepTwo"
      @submit="processStepThree"
      v-if="helper.currentStep > 2 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 3"
    />
    <form-guest-process
      v-if="helper.currentStep === 4"
      :step-one="form.stepOne"
      :step-two="form.stepTwo"
      :step-three="form.stepThree"
      @finish="
        () => {
          this.$emit('saved');
        }
      "
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
        stepOne: {},
        stepTwo: {},
        stepThree: {},
        stepFour: {},
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

        currentStep: 1,
        isLoading: false,
        savingProcess: 0,
      },
    };
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
