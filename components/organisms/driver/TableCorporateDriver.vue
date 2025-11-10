<template>
  <div>
    <content-table-view
      :length="pagination.total_data"
      :is_loading="helper.is_loading"
      :is_error="helper.is_error"
      :id="`wrapper__${id}`"
      :test_id="`wrapper__${id}`"
    >
      <div class="table-responsive rounded-top table-freeze mb-0">
        <table
          class="table table-striped table-borderless mb-0 custom-tbl"
          :data-testid="id"
        >
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th class="text-dark" :data-testid="`${id}__th-no`">No</th>
              <th class="text-dark" :data-testid="`${id}__th-name`">Nama</th>
              <th class="text-dark" :data-testid="`${id}__th-nik`">NIK</th>
              <th class="text-dark" :data-testid="`${id}__th-phone`">
                No Telp
              </th>
              <th class="text-dark" :data-testid="`${id}__th-option`">Opsi</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(driver, index) in data"
              :key="`driver-${index}`"
              :class="{ 'selected-row': selected.id === driver.id }"
            >
              <td :data-testid="`${id}__tr-${index}__td-no`">
                {{ index + (pagination.current_page - 1) * 10 + 1 }}
              </td>
              <td :data-testid="`${id}__tr-${index}__td-name`">
                {{ driver.name }}
              </td>
              <td :data-testid="`${id}__tr-${index}__td-nik`">
                {{ driver.nik }}
              </td>
              <td :data-testid="`${id}__tr-${index}__td-phone`">
                {{ driver.phone }}
              </td>
              <td
                class="text-center"
                :data-testid="`${id}__tr-${index}__td-option`"
              >
                <dropdown-button
                  text=""
                  size="sm"
                  variant="gray"
                  type="outline"
                  additional_class="p-0"
                  :id="`btn_action_${index}`"
                  caret="font-size-20 bx bx-dots-vertical-rounded"
                  :has_custom_action="true"
                  :ref="`btn-action-${index}`"
                  :test_id="`${id}__tr-${index}__btn-option`"
                >
                  <active-button
                    icon="bx bx-pencil"
                    icon_size="16"
                    icon_color="text-dark"
                    text="Edit akun"
                    additional_class="border-0 w-100 text-left  p-2 bg-transparent"
                    align="rtl"
                    @click="passEditToParent(driver)"
                    :id="`${id}__tr-${index}__btn-edit`"
                    :test_id="`${id}__tr-${index}__btn-edit`"
                  />
                  <active-button
                    icon="bx bx-trash"
                    icon_size="16"
                    icon_color="text-danger"
                    text_color="text-danger"
                    text="Hapus akun"
                    additional_class="border-0 w-100 text-left  p-2 bg-transparent"
                    align="rtl"
                    @click="passDeleteToParent(driver)"
                    :id="`${id}__tr-${index}__btn-delete`"
                    :test_id="`${id}__tr-${index}__btn-delete`"
                  />
                </dropdown-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-100">
        <div class="col-12 text-center text-lg-right">
          <card-pagination-view
            :per_page="pagination.per_page"
            :total_data="pagination.total_data"
            additional_class="mt-3"
            :current_page="pagination.current_page"
            id="pagination_corporate"
            @update="passUpdatePagination"
            :test_id="`${id}__pagination`"
          />
        </div>
      </div>
    </content-table-view>
    <modal-confirmation
      v-model="modal.modal_delete"
      :is_loading="helper.is_loading"
      text="Apakah anda yakin untuk menghapus akun driver ini?"
      submit_button_text="Submit"
      @cancel="passCancelDeleteToParent"
      @submit="processDeleteData"
    />
  </div>
</template>

<script>
import { driverMethods } from "~/store/helperActions";

export default {
  components: {
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
    ModalConfirmation: () =>
      import("@utilities/molecules/modal-view/ModalConfirmationView"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    PriceLabel: () => import("@utilities/atoms/label/PriceLabel"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
  },
  props: {
    is_searching: { default: false },
    filter: { default: () => ({}) },
    selected: { default: () => ({}) },
  },
  data: () => ({
    id: "table-driver",
    data: [],
    selected_id: "",
    modal: {
      modal_delete: false,
    },
    helper: {
      CORPORATE: {},
      is_loading: false,
      is_error: false,
    },
    pagination: {
      per_page: 10,
      current_page: 1,
      total_data: 10,
    },
  }),
  watch: {
    is_searching: {
      async handler(value) {
        if (value) await this.passUpdatePagination(1);
      },
    },
  },
  async mounted() {
    this.helper.CORPORATE = JSON.parse(this.$utility.getCookie("corporate"));
    await this.processGetData();
  },
  methods: {
    getCorporateDriver: driverMethods.getCorporateDriver,
    deleteCorporateDriver: driverMethods.deleteCorporateDriver,

    passErrorToParent(error) {
      this.$emit("error", { state: true, message: error });
    },

    passEditToParent(data) {
      this.$emit("edit", data);
    },

    passCancelDeleteToParent() {
      this.modal.modal_delete = false;
      this.$emit("cancel");
    },

    passDeleteToParent(data) {
      this.$emit("delete", data);
    },

    toggleModalDelete() {
      this.modal.modal_delete = !this.modal.modal_delete;
    },

    async passUpdatePagination(page) {
      this.pagination.current_page = page;
      await this.processGetData();
    },

    setPayloadGet() {
      const payload = {
        filter: [{ key: "corporate_id", value: this.helper.CORPORATE.id }],
        pagination: {
          current_page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        },
      };
      if (this.filter.name) {
        payload.filter.push({ key: "name", value: this.filter.name });
      }
      return payload;
    },

    setPayloadDelete() {
      return {
        id: this.selected.id,
      };
    },

    async processGetData() {
      this.helper.is_error = false;
      this.helper.is_loading = true;
      try {
        let payload = this.setPayloadGet();
        let data = await this.getCorporateDriver(payload);
        this.data = data.values;
        this.pagination.total_data = data.total_values;
      } catch (error) {
        console.log(error)
        this.data = [];
        this.pagination.total_data = 0;
        this.helper.is_error = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableCorporateDriver`
        );
      }
      this.$emit("ready");
      this.helper.is_loading = false;
    },

    async processDeleteData() {
      this.helper.is_loading = true;
      try {
        let payload = this.setPayloadDelete();
        await this.deleteCorporateDriver(payload);
        this.modal.modal_delete = false;
        this.processGetData();
      } catch (error) {
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processDeleteData in TableCorporateDriver`
        );
      }
      this.helper.is_loading = false;
    },
  },
};
</script>
