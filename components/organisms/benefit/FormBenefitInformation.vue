<template>
  <div>
    <div v-if="helper.loading.form" class="my-5 py-5 text-center">
      <b-spinner variant="primary" />
    </div>
    <div v-else>
      <div class="bg-success-90 rounded-lg border border-success my-3">
        <div class="d-flex gap-2 px-3 py-2">
          <div class="mr-1 text-center">
            <i class="bx bx-check-circle font-size-24 text-success"></i>
          </div>
          <div>
            <p class="mb-0 text-success font-weight-bold">
              Berhasil menemukan transaksi pengeunjung
            </p>
            <p class="mb-0 text-success font-size-12">
              Silakan lengkapi informasi pengunjung untuk melanjutkan proses
              pemberian benefit.
            </p>
          </div>
        </div>
      </div>
      <div class="mt-3 d-flex mb-3">
        <div class="badge badge-pill pt-1 badge-primary">2</div>
        <div class="font-size-12 ml-2 font-weight-bold">
          Informasi Pengunjung
        </div>
      </div>
      <div class="row">
        <div class="col-12 my-0 col-lg-6">
          <input-text-group
            v-model="form.name"
            :is_error="$v.form.name.$error"
            label_info=""
            id="txt_name"
            label="Nomor Kamar"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: Mrs Sultoni Daswand"
            :error_message="[
              {
                state: $v.form.name.required,
                message: 'Nomor Kamar tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__name`"
            :ref="`${id}__name`"
          />
        </div>
        <div class="col-12 my-0 col-lg-3">
          <input-radio-group
            v-model="form.vehicleType"
            :is_error="$v.form.vehicleType.$error"
            label_info=""
            :options="options.vehicleType"
            id="txt_vehicleType"
            label="Jenis Kendaraan"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: B31234CD"
            :error_message="[
              {
                state: $v.form.vehicleType.required,
                message: 'Jenis Kendaraan tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__vehicleType`"
            :ref="`${id}__vehicleType`"
          />
        </div>
        <div class="col-12 my-0 col-lg-3">
          <input-text-group
            v-model="form.licensePlate"
            format="license_plate"
            :is_error="$v.form.licensePlate.$error"
            label_info=""
            id="txt_licensePlate"
            label="Plat Nomor"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: B31234CD"
            :error_message="[
              {
                state: $v.form.licensePlate.required,
                message: 'Plat Nomor tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__licensePlate`"
            :ref="`${id}__licensePlate`"
          />
        </div>

        <div class="col-12 col-lg-7 my-1">
          <input-select-group
            v-model="form.productId"
            :options="options.product"
            search_by="name"
            :is_error="$v.form.productId.$error"
            id="txt_productId"
            label="Paket Produk"
            label_info="Paket ini akan menentukan tagihan yang akan didapatkan setiap bulan."
            :is_submitted="form.isSubmitted"
            placeholder="Pilih Paket Produk"
            :error_message="[
              {
                state: $v.form.productId.required,
                message: 'Paket Produk tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__productId`"
            :ref="`${id}__productId`"
          />
        </div>
        <div class="col-12 col-lg-5 my-1">
          <input-textarea-group
            v-model="form.note"
            :is_error="$v.form.note.$error"
            label_info=""
            id="txt_note"
            label="Catatan/Alasan Pemberian"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: Pengunjung benefit total spent diatas Rp2.000.000,-."
            :error_message="[
              {
                state: $v.form.note.required,
                message: 'Catatan/Alasan Pemberian tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__note`"
            :ref="`${id}__note`"
          />
        </div>

        <div class="col-12 col-lg-12 text-right mt-2 px-2" v-if="!isPassed">
          <active-button text="Berikutnya" @click="processSubmitForm()" />
          <active-button
            text="Batal"
            type="outline"
            @click="$emit('cancel')"
            additional_class="mr-1 px-3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productMethods } from "@/store/helperActions";
import { required } from "vuelidate/lib/validators";

export default {
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputTextareaGroup: () =>
      import("@utilities/molecules/input-group/InputTextareaGroup"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
    InputRadioGroup: () =>
      import("@utilities/molecules/input-group/InputRadioGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  props: {
    isPassed: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {
      id: "FormBenefitInformation",
      form: {
        name: "",
        vehicleType: "MB",
        note: "",
        licensePlate: "",
        productId: "",
        isSubmitted: false,
      },
      options: {
        vehicleType: [
          { value: "MB", text: "Mobil" },
          { value: "MT", text: "Motor" },
        ],
        product: [],
        productCompany: [],
        productDictionary: [],
      },
      helper: {
        differentDays: 0,
        loading: {
          product: false,
          form: false,
        },
      },
    };
  },
  validations: {
    form: {
      vehicleType: { required },
      name: { required },
      start: { required },
      end: { required },
      licensePlate: { required },
      productId: { required },
    },
  },
  async mounted() {
    await this.processGetOptionsDictionary();
    await this.processGetOptionsProduct();
  },
  methods: {
    getMembershipProduct: productMethods.getMembershipProduct,
    getMembershipDictionary: productMethods.getMembershipDictionary,

    setPayloadProduct() {
      return {
        filter: [{ key: "corporateId", value: this.$utility.getCorporateId() }],
        pagination: {
          page: 1,
          per_page: 100,
        },
      };
    },

    processSubmitForm() {
      this.form.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      this.$emit("submit", {
        data: this.form,
      });
    },

    processMakeMappedData() {},

    processFillingOptionsProduct() {
      const options = this.options.productDictionary.map((opt) => {
        const dictionary = this.options.productCompany.find(
          (item) => item.productId === opt.id,
        );
        if (dictionary?.name) {
          return {
            ...opt,
            name: dictionary ? dictionary.name : "Unknown Product",
            productId: opt.id,
          };
        }
      });
      this.options.product = options.filter((opt) => opt !== undefined);
    },

    async processGetOptionsProduct() {
      try {
        this.helper.loading.product = true;
        const { values } = await this.getMembershipProduct(
          this.setPayloadProduct(),
        );
        this.options.productCompany = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsProduct in FormGuestInformation`,
        );
      } finally {
        this.helper.loading.product = false;
      }
    },

    async processGetOptionsDictionary() {
      try {
        this.helper.loading.product = true;
        this.options.productDictionary =
          await this.$utility.getOptionProductMembership();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsDictionary in FormGuestInformation`,
        );
      } finally {
        this.helper.loading.product = false;
      }
    },
  },
};
</script>

<style></style>
