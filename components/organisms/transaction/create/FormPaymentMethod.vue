<template>
  <div class="row mt-3 m-0 p-0">
    <div class="col-12 col-lg-8">
      <div class="bg-white rounded-lg shadow p-4">
        <p class="font-weight-bold font-size-18">Ringkasan Pemesanan</p>
        <div
          style="overflow-y: scroll; min-height: 200px; max-height: 400px"
          v-if="data.length > 0"
        >
          <div
            class="d-flex w-100 justify-content-between"
            v-for="(trx, index) in data"
            :key="`transaction-item__${index}`"
          >
            <div class="flex-grow-1">
              <p class="my-1 font-size-14">
                {{ trx.number }}
              </p>
              <p class="my-1 font-size-12 text-muted">
                {{ trx.packageText }}
              </p>
            </div>
            <div class="font-weight-bold font-size-16">
              Rp{{
                trx.selectedPackage.length > 1
                  ? $utility.convertToRupiah(
                      trx.selectedPackage.reduce(
                        (sum, opt) => sum + opt.price,
                        0
                      )
                    )
                  : $utility.convertToRupiah(trx.selectedPackage[0].price)
              }}
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="my-1 font-weight-bold font-size-18">Sub Total</p>
          <p class="my-1 font-weight-bold font-size-18">
            Rp{{ $utility.convertToRupiah(helper.subTotal) }}
          </p>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="my-1 font-weight-bold font-size-18">Biaya layanan</p>
          <p class="my-1 font-weight-bold font-size-18">
            {{ data.length }} x Rp{{
              $utility.convertToRupiah(helper.corporate.service_fee)
            }}
          </p>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="my-1 font-weight-bold font-size-18">Biaya Admin</p>
          <p
            class="my-1 font-weight-bold font-size-18"
            v-if="!helper.isLoading"
          >
            Rp{{ $utility.convertToRupiah(helper.corporate.admin_charge) }}
          </p>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="my-1 font-weight-bold font-size-18">
            Pajak
            <span v-if="!helper.isLoading">(11%)</span>
          </p>
          <p
            class="my-1 font-weight-bold font-size-18"
            v-if="!helper.isLoading"
          >
            Rp{{ $utility.convertToRupiah(helper.serviceTax) }}
          </p>
        </div>
        <div class="d-flex w-100 justify-content-between">
          <p class="my-1 font-weight-bold font-size-18">Total Pembayaran</p>
          <p class="my-1 font-weight-bold font-size-18">
            Rp{{ $utility.convertToRupiah(helper.total) }}
          </p>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-4">
      <div class="bg-white rounded-lg shadow p-4">
        <p class="font-weight-bold font-size-18">Pilih Metode Pembayaran</p>
        <div
          v-for="(opt, index) in options.payment"
          :key="`options-payment__${index}`"
          class="w-100 cursor-pointer"
          @click="processChangePayment(opt)"
        >
          <div
            :class="`d-flex w-100 my-2 rounded-lg border p-3 align-items-center justify-content-between ${
              form.payment.value === opt.value
                ? 'border-primary bg-primary-80'
                : ''
            }`"
          >
            <div class="px-1">
              <img
                :src="helper.paymentImage[opt.value]"
                style="max-height: 24px"
              />
            </div>

            <div class="px-1">
              <i
                :class="`${
                  form.payment.value === opt.value
                    ? 'bx bx-check-circle text-primary font-size-22 mt-1'
                    : 'bx bx-radio-circle text-muted font-size-26 mt-1'
                }`"
              ></i>
            </div>
          </div>
        </div>

        <div class="mt-3 text-right">
          <p class="text-muted">
            <i class="bx bx-error-cirlce"></i>
            <span class="font-size-12">
              Pembayaran dengan virtual account akan dicek secara otomatis
            </span>
          </p>
          <active-button
            additional_class="px-3"
            text="Kembali"
            size="lg"
            type="outline"
            @click="$emit('back')"
            variant="secondary"
          />
          <active-button
            additional_class="px-3"
            text="Selesai dan Bayar"
            size="lg"
            @click="modal.confirmation = true"
          />
        </div>
      </div>
    </div>
    <plain-modal v-model="modal.confirmation" size="sm">
      <div class="mt-0 mb-2">
        <i class="bx bx-error-circle" style="font-size: 64px"></i>
        <p class="font-size-12 mt-3">
          <span class="font-weight-bold font-size-14">
            Apakah data sudah sesuai?
          </span>
          <br />
          <span>
            Apakah data pemesanan dan driver yang anda masukkan sudah sesuai?
          </span>
        </p>
        <active-button
          size="sm"
          text="Selesai dan Submit"
          @click="processNextPage"
          additional_class="w-100"
        />
        <active-button
          size="sm"
          type="outline"
          text="Sesuaikan kembali"
          @click="modal.confirmation = false"
          additional_class="w-100 mt-1"
        />
      </div>
    </plain-modal>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { subscriptionMethods } from "@/store/helperActions";
import BCA_IMAGE from "~/static/payments/va_bca.png";
import GOPAY_IMAGE from "~/static/payments/gopay.png";

export default {
  components: {
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
  },
  props: {
    data: { default: () => ({}) },
    corporate: { default: () => ({}) },
    paymentSelected: { default: () => ({}) },
  },
  data: () => ({
    form: {
      payment: { text: "BCA", value: "bca" },
      isSubmitted: false,
    },
    options: {
      payment: [
        { text: "BCA", value: "bca" },
        // { text: "Gopay", value: "gopay" },
      ],
    },
    modal: {
      confirmation: false,
    },
    helper: {
      paymentImage: {
        bca: BCA_IMAGE,
        gopay: GOPAY_IMAGE,
      },
      corporate: {},
      total: 0,
      subTotal: 0,
      serviceTax: 0,
      isError: false,
      isLoading: false,
    },
  }),
  validations: {
    form: {
      payment: {
        required,
      },
    },
  },
  async mounted() {
    await this.processGetCorporate();
    if (this.paymentSelected.value) this.form.payment = this.paymentSelected;
    this.processCountTotal();
  },
  methods: {
    getCorporateDetail: subscriptionMethods.getCorporateDetail,
    processCheckPayment() {
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },

    processChangePayment(payment) {
      this.form.payment = payment;
    },

    async processGetCorporate() {
      this.helper.isLoading = true;
      this.helper.isError = false;
      try {
        const payload = {
          id: this.corporate.id,
        };
        const data = await this.getCorporateDetail(payload);
        this.helper.corporate = { ...data, service_fee: 100000 };
        this.helper.isLoading = false;
      } catch (error) {
        this.helper.isError = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetCorporate in FormPaymentMethod`
        );
        this.helper.isLoading = false;
      }
    },

    processCountTotal() {
      this.helper.total = 0;
      this.helper.subTotal = 0;

      this.data.map((opt) => {
        this.helper.subTotal += parseInt(
          opt.selectedPackage.length > 1
            ? opt.selectedPackage.reduce((sum, opt) => sum + opt.price, 0)
            : parseInt(opt.selectedPackage[0].price)
        );
      });

      this.helper.serviceTax = parseInt(this.helper.subTotal) * 0.11;
      this.helper.total =
        parseInt(this.helper.subTotal) +
        parseInt(this.helper.corporate.admin_charge) +
        parseInt(this.data.length * this.helper.corporate.service_fee) +
        parseInt(this.helper.serviceTax);
    },

    processNextPage() {
      if (this.processCheckPayment()) {
        this.$emit("saved", this.form.payment);
      }
    },
  },
};
</script>

<style></style>
