<script>
import { driverMethods } from "~/store/helperActions";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  components: {
    SquareCard: () => import("@utilities/atoms/card/SquareCard"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
  },
  props: {
    data: { type: [Object, Array] },
  },
  data: () => ({
    form: {
      new_password: "",
      re_password: "",
      is_submitted: false,
    },
    button: {
      submit_button: {
        text: "Simpan",
        is_disabled: false,
        is_showed: true,
      },
      loading_button: {
        is_showed: false,
      },
    },
  }),
  validations: {
    form: {
      new_password: { required, minLength: minLength(8) },
      re_password: {
        required,
        minLength: minLength(8),
        sameAs: sameAs("new_password"),
      },
    },
  },
  methods: {
    updateCorporateDriver: driverMethods.updateCorporateDriver,

    passSavedToParent() {
      this.$emit("saved", true);
    },

    passErrorToParent(error) {
      this.$emit("error", { state: true, message: error });
    },

    cancelEditPassword() {
      this.$emit("close", true);
    },

    setPayloadUpdate() {
      return {
        password: this.form.new_password,
        phone_number: this.data.phone_number,
        id: this.data.id,
        ...this.data,
      };
    },

    toggleButtonSubmit() {
      if (this.button.submit_button.is_showed) {
        this.button.submit_button.is_showed = false;
        this.button.loading_button.is_showed = true;
      } else {
        this.button.submit_button.is_showed = true;
        this.button.loading_button.is_showed = false;
      }
    },

    async processSubmitForm() {
      this.toggleButtonSubmit();
      this.form.is_submitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        await this.processUpdatePassword();
      }
      this.toggleButtonSubmit();
    },

    async processUpdatePassword() {
      try {
        let payload = this.setPayloadUpdate();
        await this.updateCorporateDriver(payload);
        this.passSavedToParent();
      } catch (error) {
        this.passErrorToParent(error);
      }
    },
  },
};
</script>
<template>
  <div class="px-3">
    <b-row class="border rounded py-3 px-2">
      <b-col cols="12">
        <input-text-group
          v-model="form.new_password"
          :is_error="$v.form.new_password.$error"
          id="txt_new_password"
          test_id="txt_new_password"
          label="Kata sandi baru"
          :is_submitted="form.is_submitted"
          placeholder="Masukkan Kata sandi baru"
          is_password
          :error_message="[
            {
              state: $v.form.new_password.required,
              message: 'Kata sandi baru tidak boleh kosong',
            },
            {
              state: $v.form.new_password.minLength,
              message: 'Kata sandi minimal 8 karakter',
            },
          ]"
        />
      </b-col>
      <b-col cols="12">
        <input-text-group
          v-model="form.re_password"
          :is_error="$v.form.re_password.$error"
          id="txt_re_password"
          test_id="txt_re_password"
          label="Ulangi Kata sandi baru"
          :is_submitted="form.is_submitted"
          placeholder="Masukkan Kata sandi baru"
          is_password
          :error_message="[
            {
              state: $v.form.re_password.required,
              message: 'Kata sandi baru tidak boleh kosong',
            },
            {
              state: $v.form.re_password.minLength,
              message: 'Kata sandi minimal 8 karakter',
            },
            {
              state: $v.form.re_password.sameAs,
              message: 'Kata sandi baru tidak sama',
            },
          ]"
        />
      </b-col>
    </b-row>
    <b-col cols="12" class="text-center mt-3">
      <active-button
        text="Batal"
        type="outline"
        additional_class="px-5"
        variant="grey"
        @click="cancelEditPassword"
      />
      <active-button
        v-if="button.submit_button.is_showed"
        :is_disabled="button.submit_button.is_disabled"
        :text="button.submit_button.text"
        additional_class="px-5"
        id="btn-submit__change-password"
        test_id="btn-submit__change-password"
        @click="processSubmitForm"
      />
      <disabled-button
        v-if="button.loading_button.is_showed"
        id="btn-loading__change-password"
        test_id="btn-loading__change-password"
        additional_class="px-5"
      />
    </b-col>
  </div>
</template>
