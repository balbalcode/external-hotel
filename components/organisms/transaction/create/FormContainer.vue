<template>
  <div>
    <p class="font-size-16 font-weight-bold">Spesifikasi Kontainer</p>
    <div
      class="row px-3"
      v-for="(container, index) in $v.form.data.$each.$iter"
      :key="`form-container__${index}`"
      :data-testid="`form-container__${index}`"
    >
      <div
        :class="`border rounded-lg p-3 my-3 col-12 ${
          index > 0 ? 'col-lg-11' : 'col-lg-12'
        } `"
      >
        <div class="row">
          <div class="col-12 col-lg-4">
            <input-select-group
              v-model="container.vehicleType.$model"
              :options="options.vehicleType"
              :is_error="container.vehicleType.$error"
              :error_message="[
                {
                  state: container.vehicleType.required,
                  message: 'Tipe Kontainer tidak boleh kosong',
                },
              ]"
              label="Jenis Kontainer"
              :is_submitted="form.isSubmitted"
              :id="`form-container__vehicleType__${index}`"
              :ref="`form-container__vehicleType__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4">
            <input-select-group
              v-model="container.vehicleSize.$model"
              :options="options.vehicleSize"
              :is_error="container.vehicleSize.$error"
              :error_message="[
                {
                  state: container.vehicleSize.required,
                  message: 'Warna Kontainer tidak boleh kosong',
                },
              ]"
              label="Ukuran Kontainer"
              :is_submitted="form.isSubmitted"
              :id="`form-container__vehicleSize__${index}`"
              :ref="`form-container__vehicleSize__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4">
            <input-select-group
              v-model="container.ventilatorCount.$model"
              :options="options.ventilatorCount"
              :is_error="container.ventilatorCount.$error"
              :error_message="[
                {
                  state: container.ventilatorCount.required,
                  message: 'Warna Kontainer tidak boleh kosong',
                },
              ]"
              label="Ventilator Kontainer"
              :is_submitted="form.isSubmitted"
              :id="`form-container__ventilatorCount__${index}`"
              :ref="`form-container__ventilatorCount__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4">
            <input-text-group
              v-model="container.number.$model"
              :is_error="container.number.$error"
              :error_message="[
                {
                  state: container.number.required,
                  message: 'Nomor Kontainer tidak boleh kosong',
                },
                {
                  state: container.number.uniqueContainerNumber,
                  message: 'Nomor Kontainer sudah digunakan',
                },
              ]"
              placeholder="Contoh: BKS-12130-12/31"
              label="Nomor Kontainer"
              :is_submitted="form.isSubmitted"
              :id="`form-container__number__${index}`"
              :ref="`form-container__number__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4">
            <input-select-group
              v-model="container.isFilled.$model"
              :options="options.isFilled"
              :is_error="container.isFilled.$error"
              :error_message="[
                {
                  state: container.isFilled.required,
                  message: 'Muatan Kontainer tidak boleh kosong',
                },
              ]"
              label="Muatan Kontainer"
              :is_submitted="form.isSubmitted"
              :id="`form-container__isFilled__${index}`"
              :ref="`form-container__isFilled__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4">
            <input-date-group
              value_type="YYYY-MM-DD"
              format="YYYY-MM-DD"
              disabled_date="before-today"
              v-model="container.exitEstimation.$model"
              :is_error="container.exitEstimation.$error"
              :error_message="[
                {
                  state: container.exitEstimation.required,
                  message: 'Estimasi Keluar tidak boleh kosong',
                },
              ]"
              label="Estimasi Keluar"
              :is_submitted="form.isSubmitted"
              :id="`form-container__exitEstimation__${index}`"
              :ref="`form-container__exitEstimation__${index}`"
            />
          </div>
          <div class="col-12 col-lg-4 cursor-pointer">
            <div @click="toggleModalPackage(index)">
              <input-text-group
                :is_searchable="true"
                search_by="text"
                v-model="container.packageText.$model"
                :is_error="container.packageText.$error"
                :error_message="[
                  {
                    state: container.packageText.required,
                    message: 'Paket Layanan tidak boleh kosong',
                  },
                ]"
                placeholder="Klik untuk memilih layanan"
                label="Paket Layanan"
                :is_submitted="form.isSubmitted"
                :id="`form-container__packageText__${index}`"
                :ref="`form-container__packageText__${index}`"
              />
            </div>
          </div>
        </div>
      </div>

      <div :class="`col-12 ${index > 0 ? 'col-lg-1' : 'd-none'} `">
        <div class="h-100 d-flex flex-column justify-content-center">
          <active-button
            @click="processDeleteContainer(index)"
            text="Hapus"
            variant="danger"
            text_color="white"
            :id="`form-container__btn-delete__${index}`"
            :ref="`form-container__btn-delete__${index}`"
            size=""
            :has_shadow="false"
          />
        </div>
      </div>
    </div>

    <div class="w-100 text-center col-12">
      <active-button
        text="Tambah Kontainer Lain"
        icon="bx bx-plus-circle"
        type="outline"
        align="rtl"
        @click="processAddContainer"
      />
    </div>

    <div class="w-100 text-right mt-3">
      <active-button
        additional_class="px-3"
        text="Batal"
        type="outline"
        variant="secondary"
      />
      <active-button
        additional_class="px-3"
        text="Selanjutnya"
        @click="processNextPage"
      />
    </div>

    <plain-modal v-model="modal.packageList" size="xl">
      <form-options-package
        :index-container="helper.selectedIndex"
        :corporate="corporate"
        @submit="toggleSelectedPackage"
        @close="toggleModalPackage"
        @cancel="toggleModalPackage"
      />
    </plain-modal>
  </div>
</template>

<script>
import CONSTANT from "~/constants/corporate";
import { required, helpers } from "vuelidate/lib/validators";
export default {
  components: {
    FormOptionsPackage: () => import("./FormOptionsPackage"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
  },
  props: {
    data: { default: () => ({}) },
    corporate: { default: () => ({}) },
  },
  data: () => ({
    form: {
      data: [
        {
          number: "",
          vehicleSize: CONSTANT.VEHICLE_SIZE(0),
          isFilled: CONSTANT.CONTAINER_FILL(0),
          vehicleType: CONSTANT.VEHICLE_TYPE(0),
          ventilatorCount: CONSTANT.VENTILATOR_COUNT(0),
          exitEstimation: "",
          packageText: "",
          driver: {},
          selectedPackage: {},
        },
      ],
      isSubmitted: false,
    },
    options: {
      vehicleSize: CONSTANT.VEHICLE_SIZE(),
      vehicleType: CONSTANT.VEHICLE_TYPE(),
      ventilatorCount: CONSTANT.VENTILATOR_COUNT(),
      isFilled: CONSTANT.CONTAINER_FILL(),
    },
    helper: {
      defaultDate: "",
      selectedIndex: null,
      isLoading: false,
    },
    modal: {
      packageList: false,
    },
  }),
  validations() {
    const uniqueContainerNumber = helpers.withParams(
      { type: "uniqueContainerNumber" },
      function (value) {
        if (value === "" || value === null || value === undefined) return true;

        const list = Array.isArray(this?.form?.data) ? this.form.data : [];

        const norm = (v) =>
          v === null || v === undefined ? "" : String(v).trim().toLowerCase();

        const val = norm(value);
        let seen = 0;

        for (let i = 0; i < list.length; i++) {
          const num = list[i] ? list[i].number : "";

          if (num === "" || num === null || num === undefined) continue;

          if (norm(num) === val) {
            seen++;
            if (seen > 1) return false;
          }
        }

        return true;
      }
    );

    return {
      form: {
        data: {
          $each: {
            number: { required, uniqueContainerNumber },
            vehicleSize: { required },
            isFilled: { required },
            vehicleType: { required },
            ventilatorCount: { required },
            exitEstimation: { required },
            packageText: { required },
            selectedPackage: { required },
          },
        },
      },
    };
  },
  mounted() {
    this.helper.defaultDate = this.$utility.formatDateMoment(
      new Date(),
      "YYYY-MM-DD"
    );
    if (this.data.length > 0) this.toggleEditData();
    else this.form.data[0].exitEstimation = this.helper.defaultDate;
  },
  methods: {
    toggleEditData() {
      this.form.data = this.data.map((opt) => {
        return opt;
      });
    },

    toggleModalPackage(selectedPackage = null) {
      this.helper.selectedIndex = selectedPackage;
      if (selectedPackage !== null) {
        this.modal.packageList = true;
      } else {
        this.modal.packageList = false;
      }
    },

    toggleSelectedPackage(data) {
      this.form.data[`${parseInt(this.helper.selectedIndex)}`].packageText =
        data.text;
      this.form.data[`${parseInt(this.helper.selectedIndex)}`].selectedPackage =
        data.data;
      this.toggleModalPackage(null);
    },

    processCheckContainer() {
      this.form.isSubmitted = true;
      this.$v.form.$touch();
      return !this.$v.form.$invalid;
    },

    processDeleteContainer(index) {
      if (index > 0) this.form.data.splice(index, 1);
    },

    processAddContainer() {
      if (this.processCheckContainer()) {
        this.form.data.push({
          number: "",
          vehicleSize: CONSTANT.VEHICLE_SIZE(0),
          isFilled: CONSTANT.CONTAINER_FILL(0),
          vehicleType: CONSTANT.VEHICLE_TYPE(0),
          ventilatorCount: CONSTANT.VENTILATOR_COUNT(0),
          exitEstimation: "",
          packageText: "",
          driver: {},
          selectedPackage: {},
        });
      }
    },

    processNextPage() {
      if (this.processCheckContainer()) {
        this.$emit("saved", this.form.data);
      }
    },
  },
};
</script>

<style></style>
