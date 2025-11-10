<script>
import resolution_constant from "@/constants/resolution-center";
import { minLength } from "vuelidate/lib/validators";
export default {
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputRadioFilter: () =>
      import("@utilities/molecules/input-filter/InputRadioFilter"),
    ModalScannerQrcode: () =>
      import("@utilities/molecules/modal-view/ModalScannerQrcode"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
    GroupButton: () => import("@utilities/atoms/button/GroupButton"),
  },
  props: {},
  data: () => ({
    form: {
      value: "",
      dateRange: [],
      searchBy: resolution_constant.SEARCH_TYPE(1),
      qr: "",
      isSubmitted: false,
    },
    modal: {
      modalScan: false,
    },
    options: {
      searchBy: resolution_constant.SEARCH_TYPE(),
    },
  }),
  validations: {
    form: {
      value: { minLength: minLength(3) },
    },
  },
  methods: {
    passUpdateToParent() {
      let payload = this.setPayloadParent();
      this.$emit("update", payload);
    },
    setPayloadParent() {
      return {
        type: this.form.searchBy.value,
        value: this.form.value,
        dateRange: this.form.dateRange,
        qr: this.form.qr,
      };
    },
    toggleScanTicket() {
      // called at parent component
      this.modal.modalScan = !this.modal.modalScan;
    },
    findSearchByOption(value) {
      return this.options.searchBy.find((option) => option.value === value);
    },
    processResetFilter() {
      this.form = {
        value: "",
        dateRange: [new Date(), new Date()],
        searchBy: resolution_constant.SEARCH_TYPE(1),
      };
      this.passUpdateToParent();
      setTimeout(this.passUpdateToParent, 1000);
    },
    processGetScannedQR(value) {
      value = value.split(".");
      this.form = {
        ...this.form,
        value: value[0],
        searchBy: this.findSearchByOption("id"),
      };
      this.passUpdateToParent();
    },
    processValidateFilter() {
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.passUpdateToParent();
      }
    },
  },
};
</script>
<template>
  <div>
    <div class="row">
      <div class="col-12 col-lg-6 px-3">
        <div class="d-flex w-100">
          <div class="w-25">
            <active-button
              text="Scan QR"
              type="outline"
              additional_class="w-100"
              @click="modal.modalScan = true"
            />
          </div>
          <div class="w-50">
            <input-date-group
              label="Rentang Tanggal"
              additional_class_group=""
              ref="filter-report__date-range"
              v-model="form.dateRange"
              placeholder="Pilih Rentang Tanggal"
              type="date"
              :is_range="true"
              value_type="YYYY-MM-DD"
              format="DD-MM-YYYY"
              btn_variant="default"
              additional_class_label="d-none"
              btn_type="outline"
              disabled_date="after-today"
              :id="`filter-opt-date-range`"
              :test_id="`filter-opt-date-range`"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 px-3">
        <div class="text-left my-2 my-lg-0">
          <div class="row mx-0">
            <div class="col-12 px-0 col-lg-4">
              <input-radio-filter
                id="filter_searchBy"
                :options="options.searchBy"
                v-model="form.searchBy"
                :label="
                  form.searchBy.hasOwnProperty('text')
                    ? form.searchBy.text
                    : 'Opsi Pencarian'
                "
                btn_variant="default"
                btn_type="outline"
                additional_class_button="w-100 border rounded pt-2 pb-1"
              />
            </div>
            <div class="col-12 px-0 col-lg-6">
              <input-text-group
                placeholder="B 1234 SPN/xxx-xxx-xxx-xxx"
                additional_class_label="d-none"
                :has_caption="true"
                :is_submitted="form.isSubmitted"
                :is_error="$v.form.value.$error"
                @submit="processValidateFilter"
                :error_message="[
                  {
                    state: $v.form.value.minLength,
                    message: 'Pencarian tidak boleh kurang dari 3 karakter',
                  },
                ]"
                v-model="form.value"
              />
            </div>
            <div class="col-12 px-0 col-lg-2">
              <active-button
                text="Cari"
                additional_class="w-100"
                @click="processValidateFilter"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalScannerQrcode
      v-model="modal.modalScan"
      @update="processGetScannedQR"
    />
  </div>
</template>
