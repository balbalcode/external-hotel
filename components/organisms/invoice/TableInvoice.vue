<template>
  <div class="">
    <content-table-view
      :length="data.length"
      :is_loading="helper.loading.data"
      :is_error="helper.isError"
    >
      <div class="table-responsive rounded-top table-freeze mb-0">
        <table
          class="table table-striped table-borderless mb-0 custom-tbl"
          id="adminitrationTable"
        >
          <thead class="thead-freeze bg-gray-70">
            <tr class="border-bottom-table">
              <th class="text-dark">Kode Invoice</th>
              <th class="text-dark">Judul Tagihan</th>
              <th class="text-dark">Tanggal Pembuatan</th>
              <th class="text-dark">Total Tagihan</th>
              <th class="text-dark">Status Pembayaran</th>
              <th class="text-dark">Tanggal Pembayaran</th>
              <th class="text-dark text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice, index) in data" :key="index">
              <td>{{ invoice.id.substr(0, 6) }}</td>
              <td>{{ invoice.name }}</td>
              <td>
                {{
                  $utility.formatDateMoment(
                    invoice.createdAt,
                    "DD-MM-YYYY HH:mm:ss",
                  )
                }}
              </td>
              <td>Rp {{ $utility.convertToRupiah(invoice.amount) }},-</td>
              <td>
                <label-status-group
                  :is_default_format="false"
                  :text="
                    invoice.status === 'PAID'
                      ? 'Sudah Dibayar'
                      : 'Belum Dibayar'
                  "
                  :variant="invoice.status === 'PAID' ? 'success' : 'danger'"
                  :test_id="`${id}__tr-${index}__td-payment_status`"
                />
              </td>
              <td>
                {{
                  invoice.updatedAt
                    ? $utility.formatDateMoment(
                        invoice.updatedAt,
                        "DD-MM-YYYY HH:mm:ss",
                      )
                    : "-"
                }}
              </td>
              <td class="text-center">
                <dropdown-button
                  text=""
                  size="sm"
                  variant="gray"
                  type="outline"
                  additional_class="p-0"
                  caret="font-size-20 bx bx-dots-vertical-rounded"
                  :has_custom_action="true"
                >
                  <active-button
                    icon="ic-file-02"
                    icon_size="16"
                    text="Detail Tagihan"
                    variant="light"
                    type="outline"
                    additional_class="border-0 w-100 text-left p-2 rounded-0"
                    @click="$emit('detail', invoice)"
                    align="rtl"
                  />
                </dropdown-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-12 col-lg-12 text-right">
        <card-pagination-view
          :per_page="pagination.per_page"
          :total_data="pagination.total_data"
          additional_class="mt-3"
          :current_page="pagination.page"
          id="pagination_corporate"
          @update="passUpdatePagination"
          :test_id="`${id}__pagination`"
        />
      </div>
    </content-table-view>
  </div>
</template>

<script>
import { invoiceMethods } from "@/store/helperActions";
export default {
  components: {
    PlainModal: () => import("@utilities/atoms/modal/PlainModal"),
    ActiveButton: () => import("@utilities/atoms/button/ActiveButton"),
    DropdownButton: () => import("@utilities/atoms/button/DropdownButton"),
    ContentTableView: () =>
      import("@utilities/molecules/content-view/ContentTableView"),
    CardPaginationView: () =>
      import("@utilities/molecules/card-view/CardPaginationView"),
    LabelStatusGroup: () =>
      import("@utilities/molecules/label-group/LabelStatusGroup"),
  },
  data() {
    return {
      id: "TableGuest",
      data: [],
      selectedTransaction: {},
      helper: {
        loading: {
          data: false,
          detail: false,
        },
      },
      modal: {
        detail: false,
      },
      pagination: {
        page: 1,
        per_page: 10,
        total: 0,
      },
    };
  },
  props: {
    isSearching: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Object,
      default: () => ({
        name: "",
        rfid: "",
        range: [],
      }),
    },
  },
  watch: {
    filter: {
      handler() {
        if (this.isSearching) {
          this.processGetData();
        }
      },
      deep: true,
    },
    isSearching(value) {
      if (value) {
        this.processGetData();
      }
    },
  },
  async mounted() {
    await this.processGetData();
  },
  methods: {
    getInvoice: invoiceMethods.getInvoice,

    setPayloadInvoice() {
      let payload = {
        filter: [{ key: "corporateId", value: this.$utility.getCorporateId() }],
        pagination: {
          page: this.pagination.page,
          per_page: this.pagination.per_page,
        },
      };

      if (this.filter.name !== "") {
        payload.filter.push({ key: "guestName", value: this.filter.name });
      }

      return payload;
    },

    async passUpdatePagination(page) {
      this.pagination.page = page;
      await this.processGetData();
    },

    async processGetData() {
      try {
        this.helper.loading.data = true;
        const payload = this.setPayloadInvoice();
        const { values, total_values } = await this.getInvoice(payload);
        this.data = values;
        this.pagination.total = total_values;
        this.$emit("ready");
      } catch (error) {
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableGuest`,
        );
      } finally {
        this.helper.loading.data = false;
      }
    },
  },
};
</script>

<style></style>
