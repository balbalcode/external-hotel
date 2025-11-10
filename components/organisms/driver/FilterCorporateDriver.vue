<template>
  <div class="row my-4 mx-0">
    <div class="col-12 col-lg-7 row">
      <div class="d-flex my-1 my-lg-0 w-100 px-2">
        <div class="pr-3 mt-2">
          <div class="font-weight-bold">Filter berdasarkan</div>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-5 p-0 ml-lg-2">
      <div class="d-flex">
        <div class="flex-grow-1 pr-1">
          <input-text-group
            v-model="form.name"
            :is_error="$v.form.name.$error"
            id="filter-name"
            test_id="filter-name"
            label="Cari Nama Driver"
            :is_submitted="form.is_submitted"
            @submit="submitFilterToParent()"
            placeholder="Cari Nama Driver"
            additional_class_label="d-none"
            :error_message="[
              {
                state: $v.form.name.minLength,
                message: 'Nama Driver tidak boleh kurang dari 3 karakter',
              },
            ]"
          />
        </div>
        <div class="">
          <active-button
            id="btn_search"
            test_id="btn_search"
            text="Cari Data"
            v-if="!helper.is_loading"
            @click="processSubmitForm()"
          />
          <disabled-button id="btn_loading" test_id="btn_loading" v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { minLength } from "vuelidate/lib/validators";
export default {
  components: {
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
  },
  props: {
    is_searching: { default: false },
  },
  data: () => ({
    id: "filter-driver",
    form: {
      name: "",
      is_submitted: false,
    },
    helper: {
      is_loading: false,
    },
  }),
  watch: {
    is_searching: function (value) {
      this.helper.is_loading = value;
    },
  },
  validations: {
    form: {
      name: { minLength: minLength(3) },
    },
  },
  methods: {
    passErrorToParent(message) {
      this.$emit("error", message);
    },

    submitFilterToParent() {
      this.$emit("updated", this.form);
    },

    processSubmitForm() {
      this.form.is_submitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.submitFilterToParent();
      }
    },
  },
};
</script>

<style></style>
