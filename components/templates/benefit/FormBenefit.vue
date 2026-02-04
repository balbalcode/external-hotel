<template>
  <div class="p-2" ref="formGuest">
    <div class="d-flex">
      <div class="mt-1">
        <i
          class="ic-check-verified-02 font-size-20 text-info rounded-circle"
          style="
            background-color: #a6cdfe;
            border: 6px solid #cfe4ff;
            padding: 6px;
          "
        >
        </i>
      </div>
      <div class="ml-2">
        <h5 class="font-weight-bold my-0">Buat Parkir Gratis</h5>
        <p class="my-0 font-size-12 text-secondary">
          Isi informasi pengunjung untuk membuat parkir gratis
        </p>
      </div>
    </div>
    <form-benefit-transaction
      :data="form.stepOne"
      @submit="processStepTwo"
      v-if="helper.currentStep > 0 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 1"
    />
    <form-benefit-information
      :data="form.stepTwo"
      @submit="processStepThree"
      v-if="helper.currentStep > 1 && helper.currentStep < 4"
      :is-passed="helper.currentStep > 2"
    />
    <form-benefit-process
      v-if="helper.currentStep === 3"
      :step-one="form.stepOne"
      :step-two="form.stepTwo"
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
    FormBenefitTransaction: () =>
      import("@/components/organisms/benefit/FormBenefitTransaction"),
    FormBenefitInformation: () =>
      import("@/components/organisms/benefit/FormBenefitInformation"),
    FormBenefitProcess: () =>
      import("@/components/organisms/benefit/FormBenefitProcess"),
  },
  data: () => {
    return {
      form: {
        stepOne: {},
        stepTwo: {},
      },
      logger: {},
      helper: {
        isPassed: {
          stepOne: false,
          stepTwo: false,
        },
        currentStep: 1,
        isLoading: false,
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
