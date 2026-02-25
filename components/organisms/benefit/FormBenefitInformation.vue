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
              Berhasil menemukan transaksi pengunjung
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
            label="Nama Pengunjung"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: Mrs Sultoni Daswand"
            :error_message="[
              {
                state: $v.form.name.required,
                message: 'Nama Pengunjung tidak boleh kosong',
              },
            ]"
            :test_id="`${id}__name`"
            :ref="`${id}__name`"
          />
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
          <template v-if="helper.havingCardOption">
            <input-switch-group
              v-model="helper.isUsingCard"
              search_by="name"
              id="txt_isUsingCard"
              label="Embed Benefit dengan kartu member?"
              placeholder="Pilih Embed Benefit dengan kartu member?"
              :test_id="`${id}__isUsingCard`"
              :ref="`${id}__isUsingCard`"
            />
          </template>
        </div>
        <div class="col-12 col-lg-6 my-1">
          <input-textarea-group
            v-model="form.note"
            :is_error="false"
            label_info=""
            id="txt_note"
            label="Catatan/Alasan Pemberian"
            :is_submitted="form.isSubmitted"
            placeholder="Contoh: Pengunjung benefit total spent diatas Rp2.000.000,- dengan kode transaksi #1234567890"
            :error_message="[]"
            :test_id="`${id}__note`"
            :ref="`${id}__note`"
          />
        </div>

        <div
          class="col-12 col-lg-6 mt-2 h-100 d-flex flex-column justify-content-center"
        >
          <div v-if="helper.isUsingCard">
            <p
              class="my-0 font-size-10 text-muted"
              v-if="!helper.loading.membership && !helper.wasCheckCard"
            >
              <i class="bx bx-error-circle"></i>
              Anda belum memindai kartu kamar atau kartu khusus untuk memberikan
              parkir gratis pada kendaraan penjunjung.
            </p>

            <p
              class="my-0 font-size-10 text-muted"
              v-else-if="!helper.loading.membership && helper.wasCheckCard"
            >
              <i class="bx bx-check-circle"></i>
              Kartu kamar berhasil dipindai. Kode Kartu: {{ data.rfId }}
            </p>

            <p
              class="my-0 font-size-10 text-muted"
              v-else-if="helper.loading.membership"
            >
              <i class="bx bx-spinner bx-spin"></i>
              Memproses kartu, mohon tunggu...
            </p>
          </div>

          <div style="width: 1px !important; height: 1px; overflow: hidden">
            <input-text-group
              v-model="filter.membership.rfid"
              :is_error="$v.filter.membership.rfid.$error"
              label_info=""
              id="txt_rfid"
              additional_class_group="my-1 mx-1"
              additional_class_label="my-0 font-size-11 font-weight-bold d-none"
              size="sm"
              label="Kode Kartu"
              :is_submitted="filter.membership.isSubmitted"
              @submit="processSubmitMembership"
              placeholder="Contoh: AB2356"
              :error_message="[
                {
                  state: $v.filter.membership.rfid.required,
                  message: 'Kode Kartu tidak boleh kosong',
                },
              ]"
              :test_id="`${id}__rfid`"
              :ref="`${id}__rfid`"
            />
          </div>
        </div>
        <div class="col-12 col-lg-6 text-right mt-2 px-2">
          <active-button
            v-if="!helper.isUsingCard"
            text="Berikutnya"
            @click="processSubmitForm"
          />
          <template v-else>
            <active-button
              v-if="
                !helper.loading.membership &&
                helper.wasCheckCard &&
                !helper.conflictMember
              "
              text="Proses Benefit Parkir"
              test_id="btn_start_scan_rfid"
              id="btn_start_scan_rfid"
              ref="btn_start_scan_rfid"
              @click="processSubmitForm"
            />
            <active-button
              v-if="!helper.loading.membership"
              :text="`${
                helper.wasCheckCard
                  ? 'Pindai Ulang Kartu'
                  : 'Scan Kartu Sekarang'
              }`"
              :type="helper.wasCheckCard ? 'outline' : ''"
              test_id="btn_start_scan_rfid"
              id="btn_start_scan_rfid"
              ref="btn_start_scan_rfid"
              @click="processStartScanRFID"
            />
          </template>
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
import { productMethods, guestMethods } from "@/store/helperActions";
import { required, requiredIf } from "vuelidate/lib/validators";

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
    InputSwitchGroup: () =>
      import("@utilities/molecules/input-group/InputSwitchGroup"),
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
      filter: {
        membership: {
          rfid: "",
          isSubmitted: false,
        },
      },
      helper: {
        wasCheckCard: false,
        havingCardOption: true,
        isUsingCard: false,
        conflictMember: false,
        differentDays: 0,
        loading: {
          product: false,
          form: false,
          membership: false,
        },
      },
    };
  },
  watch: {
    "form.productId"(newVal) {
      this.helper.havingCardOption = newVal.values > 1;
    },
  },
  validations: {
    form: {
      name: { required },
      productId: { required },
    },

    filter: {
      membership: {
        rfid: { required },
      },
    },
  },
  async mounted() {
    await this.processGetOptionsDictionary();
    await this.processGetOptionsProduct();
    this.processFillingOptionsProduct();
  },
  methods: {
    getMembershipProduct: productMethods.getMembershipProduct,
    getMembership: guestMethods.getMembership,
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

    setPayloadMembership() {
      return {
        filter: [
          { key: "spot_id", value: this.$utility.getSpotId() },
          { key: "rf_id", value: this.filter.membership.rfid },
          { key: "history", value: true },
        ],
        pagination: {
          page: 1,
          per_page: 10,
        },
      };
    },

    processSubmitForm() {
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      console.log(this.$v.form);
      if (this.$v.form.$invalid) {
        return false;
      }
      this.$emit("submit", {
        data: this.form,
      });
    },

    processStartScanRFID() {
      this.helper.loading.membership = true;
      this.helper.wasCheckCard = false;
      this.helper.conflictMember = false;
      this.filter.membership.isSubmitted = false;
      this.$v.filter.membership.$reset();
      this.filter.membership.rfid = "";
      this.data.isNewMembership = false;
      this.data.rfId = "";
      this.data.cardId = "";
      document.getElementById("input-txt_rfid").focus();
    },

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

    processSubmitMembership() {
      this.filter.membership.isSubmitted = true;
      this.$v.filter.membership.$touch();
      if (!this.$v.filter.membership.$invalid) {
        this.processSearchMembership();
      }
    },

    async processSearchMembership() {
      try {
        this.helper.loading.membership = true;
        this.helper.wasCheckCard = true;
        this.helper.conflictMember = false;
        const payload = this.setPayloadMembership();
        const { values, total_values } = await this.getMembership(payload);
        if (total_values > 0) {
          this.processCheckingMembership(values[0]);
        } else {
          this.data.isNewMembership = true;
          this.data.rfId = this.filter.membership.rfid;
          this.data.cardId = "";
        }
      } catch (error) {
        this.data.isNewMembership = true;
        this.data.rfId = this.filter.membership.rfid;
        this.data.cardId = "";
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processSearchMembership in FormGuestMembership`,
        );
      } finally {
        this.helper.loading.membership = false;
      }
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
