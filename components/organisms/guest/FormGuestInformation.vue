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
              Berhasil memproses informasi tamu
            </p>
            <p class="mb-0 text-success font-size-12">
              Silakan perbaiki informasi tamu berikut jika diperlukan, dan
              masukkan informasi tamu lainnya.
            </p>
          </div>
        </div>
      </div>
      <div class="mt-3 d-flex mb-3">
        <div class="badge badge-pill pt-1 badge-primary">1</div>
        <div class="font-size-12 ml-2 font-weight-bold">Informasi Tamu</div>
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
            format="license_plate"
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
        <div class="col-12 col-lg-9 my-0">
          <div class="row">
            <div class="col-12 col-lg-6 my-0">
              <input-date-group
                type="date"
                disabled_date="before-today"
                format="DD-MM-YYYY"
                v-model="form.start"
                :is_error="$v.form.start.$error"
                id="txt_start"
                label="Tanggal Check-In"
                :is_submitted="form.isSubmitted"
                placeholder="Masukkan Tanggal Check-In"
                :error_message="[
                  {
                    state: $v.form.start.required,
                    message: 'Tanggal Check-In tidak boleh kosong',
                  },
                ]"
                :test_id="`${id}__start`"
                :ref="`${id}__start`"
              />
            </div>
            <div class="col-12 col-lg-6 my-1">
              <input-date-group
                type="date"
                disabled_date="before-today"
                format="DD-MM-YYYY"
                v-model="form.end"
                :is_error="$v.form.end.$error"
                id="txt_end"
                label="Tanggal Check-Out"
                :is_submitted="form.isSubmitted"
                placeholder="Masukkan Tanggal Check-Out"
                :error_message="[
                  {
                    state: $v.form.end.required,
                    message: 'Tanggal Check-Out tidak boleh kosong',
                  },
                ]"
                :test_id="`${id}__end`"
                :ref="`${id}__end`"
              />
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3 my-1">
          <div class="d-flex flex-column justify-content-end h-100 py-3">
            <div class="bg-secondary-90 rounded border border-secondary p-2">
              <p class="font-size-12 mb-0">
                Total Menginap:
                <span class="font-weight-bold">
                  {{ parseInt(helper.differentDays) }}
                </span>
                Malam
              </p>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-7 my-1">
          <input-select-group
            v-model="form.productId"
            :options="options.product"
            search_by="name"
            :is_error="$v.form.productId.$error"
            id="txt_productId"
            label="Paket Produk"
            label_info="Paket produk sudah disesuaikan dengan lama menginap tamu. Silakan pilih paket produk yang sesuai jika diperlukan."
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
import { productMethods, ocrMethods } from "@/store/helperActions";
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
      id: "form_guest_information",
      form: {
        name: "",
        vehicleType: "MB",
        start: "",
        end: "",
        licensePlate: "",
        productId: "",
        guestInformation: "",
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
        fieldsOcr: [],
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
  watch: {
    "form.start": {
      handler() {
        this.processAutoSelectProduct();
      },
      deep: true,
    },
    "form.end": {
      handler() {
        this.processAutoSelectProduct();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.processGetFormatOcr();
    await this.processGetOptionsDictionary();
    await this.processGetOptionsProduct();
    this.processFillingOptionsProduct();
    this.processMakeMappedData();
    this.processAutoSelectProduct();
  },
  methods: {
    getMembershipProduct: productMethods.getMembershipProduct,
    getMembershipDictionary: productMethods.getMembershipDictionary,
    getFormatOCR: ocrMethods.getFormatOCR,

    setPayloadProduct() {
      return {
        filter: [{ key: "corporateId", value: this.$utility.getCorporateId() }],
        pagination: {
          page: 1,
          per_page: 100,
        },
      };
    },

    toggleDateFormat(date = "19/07/25", format = "DD/MM/YY") {
      date = date.split("/");
      const dateParts = format.split("/");
      const indexDay = dateParts.indexOf("DD");
      const indexMonth = dateParts.indexOf("MM");
      const indexYear = dateParts.findIndex((opt) => opt.includes("YY"));
      const isUnifiedYear = dateParts[indexYear].length === 2;

      let year = date[indexYear];
      if (isUnifiedYear) {
        year = `20${year}`;
      }

      return new Date(
        `${year}-${String(date[indexMonth])}-${String(date[indexDay])}`
      );
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

    processAutoSelectProduct() {
      this.helper.differentDays = this.processsCountDateDifference();
      this.form.productId = this.options.product.find((opt) => {
        if (
          parseInt(opt.values) === parseInt(this.helper.differentDays) &&
          opt.period === "day"
        ) {
          return opt;
        }
      });
    },

    processsCountDateDifference() {
      const start = new Date(this.form.start);
      const end = new Date(this.form.end);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      return differenceInDays;
    },

    processMakeMappedData() {
      let data = this.helper.fieldsOcr
        .filter((opt) => opt.isPrimary)
        .map((field) => {
          return {
            ...field,
            mapped_value: this.data.data[field.key] || "",
          };
        });

      this.form.name =
        data.find((item) => item.object === "name")?.mapped_value || "";
      this.form.start = data.find((item) => item.object === "start")
        ?.mapped_value
        ? this.toggleDateFormat(
            data.find((item) => item.object === "start").mapped_value,
            "DD/MM/YY"
          )
        : new Date();
      this.form.end = data.find((item) => item.object === "end")?.mapped_value
        ? this.toggleDateFormat(
            data.find((item) => item.object === "end").mapped_value,
            "DD/MM/YY"
          )
        : new Date();

      this.form.guestInformation = JSON.stringify(data);
    },

    processFillingOptionsProduct() {
      this.options.product = this.options.productCompany.map((opt) => {
        const dictionary = this.options.productDictionary.find(
          (item) => item.id === opt.productId
        );
        return {
          ...opt,
          values: dictionary ? dictionary.values : "Unknown Product",
          period: dictionary ? dictionary.period : "day",
        };
      });
    },

    async processGetOptionsProduct() {
      try {
        this.helper.loading.product = true;
        const { values } = await this.getMembershipProduct(
          this.setPayloadProduct()
        );
        this.options.productCompany = values;
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetOptionsProduct in FormGuestInformation`
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
          `${error.message} at processGetOptionsDictionary in FormGuestInformation`
        );
      } finally {
        this.helper.loading.product = false;
      }
    },

    async processGetFormatOcr() {
      try {
        this.helper.loading.form = true;
        const payload = {
          filter: [
            { key: "corporate_id", value: this.$utility.getCorporateId() },
          ],
        };
        const { values } = await this.getFormatOCR(payload);
        this.helper.fieldsOcr = JSON.parse(values[0].fields);
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetFormatOcr in FormGuestInformation`
        );
        window.location.reload();
      } finally {
        this.helper.loading.form = false;
      }
    },
  },
};
</script>

<style></style>
