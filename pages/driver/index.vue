<script>
export default {
  components: {
    TableCorporateDriver: () =>
      import("@/components/organisms/driver/TableCorporateDriver"),
    FormCorporateDriver: () =>
      import("@/components/organisms/driver/FormCorporateDriver"),
    FormPasswordDriver: () =>
      import("@/components/organisms/driver/FormPasswordDriver"),
    FilterCorporateDriver: () =>
      import("@/components/organisms/driver/FilterCorporateDriver"),
    ContentHeaderView: () =>
      import("@utilities/molecules/content-view/ContentHeaderView"),
    InputTextGroup: () =>
      import("@utilities/molecules/input-group/InputTextGroup"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    SquareCard: () => import("@utilities/atoms/card/SquareCard"),
  },
  data: () => ({
    selectedDriver: {},
    modal: {
      modal_form: false,
      modal_delete: false,
      modal_password: false,
    },
    helper: {
      is_edit: false,
      is_error: false,
      is_searching: false,
    },
    filter: {
      name: "",
      corporate: null,
    },
  }),
  methods: {
    toggleSearch() {
      this.helper.is_searching = false;
    },

    passChangePasswordForm(data) {
      this.selectedDriver = data;
      this.modal.modal_password = true;
    },

    passEditToForm(data) {
      this.selectedDriver = data;
      this.helper.is_edit = true;
      this.modal.modal_form = true;
    },

    passAddToForm() {
      this.selectedDriver = {};
      this.helper.is_edit = false;
      this.modal.modal_form = true;
      this.modal.modal_password = false;
    },

    processSubmitSearch(value) {
      this.filter.name = value.name;
      this.filter.corporate = value.corporate;
      this.helper.is_searching = true;
    },

    processDeleteForm(data) {
      this.selectedDriver = data;
      this.$refs.table_Driver.toggleModalDelete();
    },

    processCancelForm() {
      this.helper.is_edit = false;
      this.modal.modal_form = false;
      this.modal.modal_password = false;
      this.selectedDriver = {};
    },

    processRefreshPasswordForm() {
      this.modal.modal_password = false;
    },

    processRefreshState() {
      this.selectedDriver = {};
      this.helper.is_edit = false;
      this.modal.modal_form = false;
      this.modal.modal_password = false;
      this.helper.is_searching = true;
    },
  },
};
</script>
<template>
  <div class="font-size-13">
    <content-header-view
      title_text="Daftar Driver"
      button_text="Tambah Driver"
      :has_button="true"
      button_icon="bx bx-plus-circle"
      additional_class="py-2 mb-3 pl-2 pr-3"
      additional_class_button="float-right"
      @click="passAddToForm"
      id="header-corporate_driver"
      test_id="header-corporate_driver"
    />
    <div class="bg-white rounded-lg shadow p-3">
      <filter-corporate-driver @updated="processSubmitSearch" />
      <table-corporate-driver
        :is_searching="helper.is_searching"
        :selected="selectedDriver"
        ref="table_Driver"
        :filter="filter"
        @edit="passEditToForm"
        @add="passAddToForm"
        @ready="toggleSearch"
        @delete="processDeleteForm"
        @cancel="processCancelForm"
      />
    </div>
    <plain-modal
      :id="`modal-corporate_driver`"
      :test_id="`modal-corporate_driver`"
      @close="processCancelForm"
      v-model="modal.modal_form"
      size="lg"
    >
      <form-corporate-driver
        :is_edit="helper.is_edit"
        :data="selectedDriver"
        @password="passChangePasswordForm"
        @saved="processRefreshState"
        @cancel="processCancelForm"
      />
    </plain-modal>

    <plain-modal
      :id="`modal-password_Driver`"
      :test_id="`modal-password_Driver`"
      @close="processRefreshPasswordForm"
      v-model="modal.modal_password"
      size="md"
    >
      <form-password-driver
        :data="selectedDriver"
        @saved="processRefreshPasswordForm"
        @close="processRefreshPasswordForm"
      />
    </plain-modal>
  </div>
</template>
