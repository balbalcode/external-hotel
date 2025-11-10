<template>
  <content-form-view
    :is_edit="is_edit"
    title="Driver Perusahaan"
    :has_border="false"
    padding="px-0 py-1"
  >
    <div class="row">
      <div class="col-12 col-lg-6">
        <input-text-group
          v-model="form.name"
          :is_error="$v.form.name.$error"
          label="Nama"
          :is_submitted="form.is_submitted"
          placeholder="Masukkan nama"
          :error_message="[
            {
              state: $v.form.name.required,
              message: 'Nama tidak boleh kosong',
            },
          ]"
          :id="`${id}__name`"
          :test_id="`${id}__name`"
          :ref="`${id}__name`"
        />
      </div>
      <div class="col-12 col-lg-6">
        <input-text-group
          label="NIK"
          placeholder="Nomor Induk Kependudukan"
          :is_submitted="form.is_submitted"
          :format="['no-letter', 'no-space', 'no-symbol']"
          :test_id="`${id}__nik`"
          :id="`${id}__nik`"
          :ref="`${id}__nik`"
          :max_length="16"
          v-model="form.nik"
          :is_error="$v.form.nik.$error"
          :error_message="[
            {
              state: $v.form.nik.required,
              message: 'NIK petugas tidak boleh kosong',
            },
            {
              state: $v.form.nik.minLength,
              message: 'NIK petugas tidak boleh kurang dari 16 karakter',
            },
          ]"
        />
      </div>
      <div class="col-12 col-lg-6">
        <input-text-group
          label="Username"
          placeholder="contoh: soulparking"
          :is_submitted="form.is_submitted"
          :id="`${id}__nik`"
          :ref="`${id}__nik`"
          :data-testid="`${id}__nik`"
          :is_error="$v.form.username.$error"
          :format="['no-symbol', 'no-space', 'lower-case']"
          v-model="form.username"
          label_info="Username hanya bisa mengandung huruf kecil, angka dan underscore (_)"
          :error_message="[
            {
              state: $v.form.username.required,
              message: 'Username petugas tidak boleh kosong',
            },
          ]"
        />
      </div>
      <div class="col-12 col-lg-6">
        <input-text-group
          v-model="form.phone"
          :format="['no-letter', 'no-space']"
          :is_error="$v.form.phone.$error"
          label="Nomor telepon"
          :is_submitted="form.is_submitted"
          placeholder="Masukkan nomor telp"
          :error_message="[
            {
              state: $v.form.phone.required,
              message: 'Nomor Telp tidak boleh kosong',
            },
          ]"
          :id="`${id}__phone_number`"
          :test_id="`${id}__phone_number`"
          :ref="`${id}__phone_number`"
        />
      </div>
      <div class="col-12 col-lg-6" v-if="is_edit">
        <template>
          <plain-label value="Kata sandi" :is_bold="true" />
          <br />
          <active-button
            @click="passChangePassword"
            id="btn-change__pasword-user"
            test_id="btn-change__pasword-user"
            type="outline"
            text="Ubah Kata sandi"
          />
        </template>
      </div>
      <b-col cols="12" lg="6" v-if="!is_edit">
        <input-text-group
          label="Kata sandi"
          :id="`${id}__password`"
          :test_id="`${id}__password`"
          v-model="form.password"
          placeholder="Masukkan kata sandi"
          is_password
          :ref="`${id}__password`"
          :is_submitted="form.is_submitted"
          :is_error="$v.form.password.$error"
          :error_message="[
            {
              state: $v.form.password.required,
              message: 'Kata sandi tidak boleh kosong',
            },
            {
              state: $v.form.password.minLength,
              message: 'Kata sandi harus lebih dari 8 huruf',
            },
          ]"
        />
      </b-col>
      <b-col cols="12" lg="6" v-if="!is_edit">
        <input-text-group
          label="Konfirmasi kata sandi"
          :id="`${id}__re-password`"
          :test_id="`${id}__re-password`"
          v-model="form.re_password"
          :is_error="$v.form.re_password.$error"
          is_password
          :ref="`${id}__re-password`"
          placeholder="Masukkan Konfirmasi kata sandi"
          :is_submitted="form.is_submitted"
          :error_message="[
            {
              state: $v.form.re_password.required,
              message: 'Konfirmasi kata sandi tidak boleh kosong',
            },
            {
              state: $v.form.re_password.sameAs,
              message: 'Konfirmasi kata sandi sama',
            },
          ]"
        />
      </b-col>
    </div>
    <div class="mt-3">
      <div class="text-right">
        <active-button
          additional_class="px-5"
          @click="passCancelToParent()"
          type="outline"
          variant="grey"
          text="Batal"
          :id="`${id}__btn-cancel`"
          :test_id="`${id}__btn-cancel`"
          :ref="`${id}__btn-cancel`"
        />
        <disabled-button
          v-if="helper.is_loading_submit"
          :id="`${id}__btn-loading`"
          :test_id="`${id}__btn-loading`"
          :ref="`${id}__btn-loading`"
        />
        <active-button
          v-else
          additional_class="px-5"
          @click="processSubmitForm()"
          :id="`${id}__btn-submit`"
          :test_id="`${id}__btn-submit`"
          :ref="`${id}__btn-submit`"
          :text="is_edit ? 'Simpan Perubahan' : 'Simpan'"
        />
      </div>
    </div>
  </content-form-view>
</template>

<script>
import { driverMethods } from "~/store/helperActions";
import {
  required,
  requiredIf,
  sameAs,
  minLength,
} from "vuelidate/lib/validators";

export default {
  components: {
    ContentFormView: () =>
      import("@utilities/molecules/content-view/ContentFormView"),
    InputSelectGroup: () =>
      import("@utilities/molecules/input-group/InputSelectGroup"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    PlainLabel: () => import("@utilities/atoms/label/PlainLabel"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DisabledButton: () => import("@utilities/atoms/button/DisabledButton"),
  },
  props: {
    data: { type: [Object, Array] },
    is_edit: { default: false },
  },
  data: () => ({
    id: "form-driver",
    form: {
      id: "",
      name: "",
      username: "",
      nik: "",
      password: "",
      re_password: "",
      phone: "",
    },
    options: {
      corporate: [],
    },
    modal: {
      modal_password: false,
    },
    helper: {
      CORPORATE: {},
      limit_options: 20,
      is_loading: false,
      loading: {
        corporate: true,
      },
      is_loading_submit: false,
    },
  }),
  validations: {
    form: {
      username: { required },
      name: { required },
      phone: { required },
      nik: { required, minLength: minLength(16) },
      password: {
        required: requiredIf(function () {
          return !this.is_edit;
        }),
        minLength: minLength(8),
      },
      re_password: {
        required: requiredIf(function () {
          return !this.is_edit;
        }),
        sameAs: requiredIf(function () {
          return !this.is_edit && sameAs("password");
        }),
      },
    },
  },
  async mounted() {
    this.helper.CORPORATE = JSON.parse(this.$utility.getCookie("corporate"));
    this.toggleFormData();
  },
  methods: {
    createCorporateDriver: driverMethods.createCorporateDriver,
    updateCorporateDriver: driverMethods.updateCorporateDriver,

    passErrorToParent(error) {
      this.$emit("error", { state: true, message: error });
    },

    passCancelToParent() {
      this.$emit("cancel", true);
    },

    passChangePassword() {
      this.$emit("password", this.data);
    },

    passSavedToParent() {
      this.$emit("saved", true);
    },

    setPayloadCreate() {
      return {
        name: this.form.name,
        username: this.form.username,
        spots: [],
        type: "C",
        identity_type: "DRIVER",
        nik: this.form.nik,
        password: this.form.password,
        phone: this.form.phone,
        corporate_company_id: this.helper.CORPORATE.id,
      };
    },

    setPayloadUpdate() {
      return {
        id: this.form.id,
        name: this.form.name,
        username: this.form.username,
        spots: [],
        type: "C",
        identity_type: "DRIVER",
        nik: this.form.nik,
        phone: this.form.phone,
        corporate_company_id: this.helper.CORPORATE.id,
      };
    },

    toggleButtonSubmit() {
      this.helper.is_loading_submit = !this.helper.is_loading_submit;
    },

    toggleFormData() {
      try {
        if (this.is_edit) {
          this.form = {
            id: this.data.id,
            name: this.data.name,
            nik: this.data.nik,
            username: this.data.username,
            phone: this.data.phone,
            is_submitted: false,
          };
        } else {
          this.form = {
            id: "",
            name: "",
            nik: "",
            password: "",
            re_password: "",
            phone: "",
          };
        }
      } catch (error) {
        this.$utility.fireToast(
          "Perusahaan gagal dimuat",
          "primary",
          "Kami gagal untuk memuat data Perusahaan yang anda pilih, beberapa opsi mungkin tidak tersedia. Anda dapat memuat ulang halaman ini"
        );
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at toggleFormData in FormCorporateDriver`
        );
      }
    },

    async processSubmitForm() {
      this.toggleButtonSubmit();
      this.form.is_submitted = true;
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.is_edit
          ? await this.processUpdateData()
          : await this.processCreateData();
      }
      this.toggleButtonSubmit();
    },

    async processCreateData() {
      try {
        let payload = this.setPayloadCreate();
        await this.createCorporateDriver(payload);
        this.passSavedToParent();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processCreateData in FormCorporateDriver`
        );
        this.passErrorToParent(error);
      }
    },

    async processUpdateData() {
      try {
        let payload = this.setPayloadUpdate();
        await this.updateCorporateDriver(payload);
        this.passSavedToParent();
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processUpdateData in FormCorporateDriver`
        );
        this.passErrorToParent(error);
      }
    },
  },
};
</script>
