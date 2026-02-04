<template>
  <div>
    <div class="row px-1">
      <div class="col-12 col-lg-6">
        <div class="d-flex" v-if="!isComplexFilter">
          <div class="mr-2 pt-2">
            <h5
              class="font-weight-bold align-self-center font-size-16 mt-4 mb-0"
            >
              Penerima Free Parking
            </h5>
          </div>
        </div>
        <div class="d-flex" v-else>
          <div>
            <input-date-group
              v-model="filter.range"
              :is_error="false"
              id="range"
              format="DD-MM-YYYY HH:mm"
              label="Rentang Tanggal"
              placeholder="Rentang Tanggal "
              :test_id="`${id}__range`"
              :ref="`${id}__range`"
              :is_range="true"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="d-flex justify-content-end">
          <div class="mr-1">
            <input-text-group
              v-model="filter.name"
              :is_error="$v.filter.name.$error"
              id="txt_name"
              label="Nama Pengunjung "
              :is_submitted="filter.isSubmitted"
              placeholder="Contoh: John Doe"
              @submit="processSubmitSearch"
              :error_message="[
                {
                  state: $v.filter.name.minLength,
                  message: 'Nama Pengunjung tidak kurang dari 3 karakter',
                },
              ]"
              :test_id="`${id}__name`"
              :ref="`${id}__name`"
            />
          </div>
          <div class="pt-1">
            <active-button
              text="Cari"
              additional_class="mt-4"
              align="rtl"
              @click="processSubmitSearch"
              :test_id="`${id}__btn_search`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
export default {
  props: {
    isComplexFilter: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    InputDateGroup: () =>
      import("@utilities/molecules/input-group/InputDateGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
  },
  data: () => ({
    id: "FilterGuest",
    filter: {
      name: "",
      rfid: "",
      range: [],
      isSubmitted: false,
    },
  }),
  mounted() {
    this.processSetDefaultRange();
    this.passUpdateSearch();
  },
  validations() {
    return {
      filter: {
        name: { minLength: minLength(3) },
      },
    };
  },
  methods: {
    passUpdateSearch() {
      this.$emit("update", {
        name: this.filter.name,
        range: [
          this.$utility.formatDateMoment(this.filter.range[0], "YYYY-MM-DD"),
          this.$utility.formatDateMoment(this.filter.range[1], "YYYY-MM-DD"),
        ],
      });
    },

    processSetDefaultRange() {
      if (this.isComplexFilter) {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        this.filter.range = [startDate, endDate];
      } else {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date();
        endDate.setHours(23, 59, 59, 999);
        this.filter.range = [startDate, endDate];
      }
    },

    processSubmitSearch() {
      this.filter.isSubmitted = true;
      this.$v.filter.$touch();
      if (!this.$v.filter.$invalid) {
        this.passUpdateSearch();
      }
    },
  },
};
</script>

<style></style>
