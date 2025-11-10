<script>
import CONSTANT from "~/constants/general";
import { transactionMethods } from "@/store/helperActions";
export default {
  components: {
    ContentSpan: () => import("@utilities/atoms/utility/ContentSpan"),
    TabBar: () => import("@utilities/molecules/tab-bar/TabBar"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    Layout: () => import("~/layouts/main"),
    FormContainer: () =>
      import("@/components/organisms/transaction/create/FormContainer"),
    FormDriver: () =>
      import("@/components/organisms/transaction/create/FormDriver"),
    FormPaymentMethod: () =>
      import("@/components/organisms/transaction/create/FormPaymentMethod"),
  },
  data: () => ({
    data: {
      container: [],
      driver: [],
      payment: {},
    },
    modal: {
      warning: false,
    },
    helper: {
      CORPORATE: "",
      tabs: CONSTANT.TRANSACTION_PARTS(),
      state: "CONTAINER",
      isError: false,
      isLoading: false,
    },
  }),
  watch: {},
  mounted() {
    this.helper.CORPORATE = JSON.parse(this.$utility.getCookie("corporate"));
  },
  methods: {
    createCorporateTransaction: transactionMethods.createCorporateTransaction,
    chargeCorporateTransaction: transactionMethods.chargeCorporateTransaction,

    processCheckData(TAB) {
      let openModal = true;
      if (this.helper.state === "CONTAINER") {
        if (this.$refs["form_container"].processCheckContainer()) {
          this.data.container = this.$refs["form_container"].form.data;
          this.data.driver = this.$refs["form_container"].form.data;
          this.helper.state = TAB.target_pane;
          openModal = false;
        }
      } else if (this.helper.state === "DRIVER") {
        if (this.$refs["form_driver"].processCheckDriver()) {
          this.data.container = this.$refs["form_driver"].form.data;
          this.data.driver = this.$refs["form_driver"].form.data;
          this.helper.state = TAB.target_pane;
          openModal = false;
        }
      } else if (this.helper.state === "PAYMENT") {
        this.data.payment = this.$refs["form_payment"].form.payment;
        this.helper.state = TAB.target_pane;
        openModal = false;
      }
      this.modal.warning = openModal;
    },

    processCheckDriver() {
      const checker = this.data.driver.find((opt) => !opt.hasOwnProperty("id"));
      return checker.number; // return false if complete all
    },

    togglePane(pane) {
      this.helper.state = pane;
    },

    processSetPayload(data, pane = "") {
      this.data.container = data;
      this.data.driver = data;
      if (pane !== "") this.helper.state = pane;
    },

    processMakePayloadCharge(id) {
      return {
        item_details: [
          {
            id: id,
          },
        ],
        custom_expiry: {
          expiry_duration: "24",
          unit: "hours",
        },
        transaction_details: {
          order_id: id,
          transaction_type: "EXTERNAL_TRANSACTION_SERVICES",
        },
        user_id: this.helper.CORPORATE.id,
        payment_type: "bank_transfer",
        bank_transfer: {
          bank: "bca",
        },
      };
    },

    processMakePayloadTransaction() {
      let payload = {
        container_transactions: [],
        payment_method: this.data.payment.value,
        corporate_id: this.helper.CORPORATE.id,
        spot_id: this.helper.CORPORATE.spot_id,
      };

      this.data.driver.map((opt) => {
        payload.container_transactions.push({
          container_id: "",
          ventilator_count: opt.ventilatorCount.value,
          vehicle_size: opt.vehicleSize.value,
          vehicle_type: opt.vehicleType.value,
          container_fill: opt.isFilled.value,
          container_code: opt.number,
          product_list: opt.selectedPackage.map((opt) => opt.id),
          time_out_estimation: this.$utility.formatDateMoment(
            opt.exitEstimation,
            "YYYY-MM-DD"
          ),
          driver_id: opt.driver.id,
        });
      });

      return payload;
    },

    async processSubmitPayload() {
      try {
        this.helper.isLoading = true;
        const PAYLOAD = this.processMakePayloadTransaction();
        const { values } = await this.createCorporateTransaction(PAYLOAD);
        const CHARGE = this.processMakePayloadCharge(values.id);
        await this.chargeCorporateTransaction(CHARGE);
        console.log(values);
        this.helper.isLoading = false;
        this.$router.push(`/transaction/detail?id=${values.id}`);
      } catch (error) {
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetPackage in FormOptionsPackage`
        );
        this.helper.isLoading = false;
      }
    },
  },
};
</script>
<template>
  <div class="font-size-13">
    <h5 class="float-left font-weight-bold align-self-center font-size-20 mb-3">
      Buat Transaksi
    </h5>
    <div v-if="helper.isLoading" class="text-center mx-auto my-5 py-5">
      <content-span size="lg" caption="" />
      <h5 class="font-weight-bold mt-n4">
        Menyimpan data <i class="bx bx-spin bx-loader-alt"></i>
      </h5>
    </div>
    <div v-else-if="helper.isError" class="text-center mx-auto my-5 py-5">
      <content-span
        size="lg"
        caption=""
        image="error.png"
        :has_animation="false"
      />
      <h5 class="font-weight-bold mt-n4 text-danger">
        Gagal Menyimpan data <i class="bx bx-error-circle"></i>
      </h5>
      <active-button
        @click="helper.isError = false"
        text="Buat Kembali"
        size="sm"
        additional_class="mt-3 px-5"
      />
    </div>
    <div v-else>
      <tab-bar
        :tabs="helper.tabs"
        v-model="helper.state"
        has_number
        :default_action="false"
        @change="processCheckData"
      />
      <div
        class="rounded-lg bg-white shadow p-3 my-3"
        v-if="helper.state !== 'PAYMENT'"
      >
        <form-container
          :data="data.container"
          :corporate="helper.CORPORATE"
          @saved="
            (data) => {
              processSetPayload(data, 'DRIVER');
            }
          "
          v-if="helper.state === 'CONTAINER'"
          ref="form_container"
        />

        <form-driver
          :data="data.driver"
          :corporate="helper.CORPORATE"
          @back="helper.state = 'CONTAINER'"
          @saved="
            (data) => {
              processSetPayload(data, 'PAYMENT');
            }
          "
          v-if="helper.state === 'DRIVER'"
          ref="form_driver"
        />
      </div>

      <form-payment-method
        :data="data.driver"
        :corporate="helper.CORPORATE"
        :payment-selected="data.payment"
        @back="helper.state = 'DRIVER'"
        @saved="
          (values) => {
            data.payment = values;
            processSubmitPayload();
          }
        "
        v-if="helper.state === 'PAYMENT'"
        ref="form_payment"
      />
    </div>

    <plain-modal v-model="modal.warning" size="sm">
      <div class="mt-0 mb-2">
        <i class="bx bx-error-circle" style="font-size: 64px"></i>
        <p class="font-size-12 mt-3">
          <span class="font-weight-bold font-size-14">
            Data tidak lengkap!
          </span>
          <br />
          <span>
            Anda harus melengkapi data terlebih dahulu untuk pindah halaman
          </span>
        </p>
        <active-button
          size="sm"
          text="Tutup dan Mengerti"
          @click="modal.warning = false"
          additional_class="w-100"
        />
      </div>
    </plain-modal>
  </div>
</template>
