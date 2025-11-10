<template>
  <div>
    <div>
      <content-table-view
        :length="pagination.total_data"
        :is_loading="helper.isLoading"
        :is_eror="helper.isError"
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
                <th class="text-dark" :data-testid="`${id}__th-invoice_id`">
                  No Invoice
                </th>
                <th class="text-dark" :data-testid="`${id}__th-payment_status`">
                  Payment Status
                </th>
                <th
                  class="text-dark"
                  :data-testid="`${id}__th-transaction_date`"
                >
                  Tanggal Transaksi
                </th>
                <th
                  class="text-dark w-300-col"
                  :data-testid="`${id}__th-container_number`"
                >
                  Nomor Kontainer
                </th>
                <th
                  class="text-dark w-200-col"
                  :data-testid="`${id}__th-container_fill`"
                >
                  Muatan Kontainer
                </th>
                <th
                  class="text-dark w-300-col"
                  :data-testid="`${id}__th-container_specification`"
                >
                  Spesifikasi Kontainer
                </th>
                <th
                  class="text-dark w-300-col"
                  :data-testid="`${id}__th-container_service`"
                >
                  Layanan Kontainer
                </th>
                <th class="text-dark" :data-testid="`${id}__th-total_price`">
                  Total Pembayaran
                </th>
                <th class="text-dark" :data-testid="`${id}__th-option`">
                  Opsi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(invoice, index) in data" :key="`invoice-${index}`">
                <td :data-testid="`${id}__tr-${index}__td-invoice_id`">
                  {{ invoice.id }}
                </td>
                <td :data-testid="`${id}__tr-${index}__td-invoice_status`">
                  <span
                    class="badge p-2 rounded-pill"
                    :style="`
                    color: ${
                      invoice.paid_at ? '#027A48' : '#B93815'
                    } !important;
                    background: ${
                      invoice.paid_at ? '#ECFDF3' : '#FFF4ED'
                    } !important`"
                  >
                    {{ invoice.paid_at ? "Sudah dibayar" : "Belum dibayar" }}
                  </span>
                </td>
                <td :data-testid="`${id}__tr-${index}__td-transaction_date`">
                  {{
                    $utility.momentAddDate(
                      invoice.created_at,
                      "7",
                      "hour",
                      "DD/MM/YYYY HH:mm:ss"
                    )
                  }}
                </td>
                <td
                  class="text-dark"
                  :data-testid="`${id}__tr-${index}__td--container_number`"
                >
                  <span v-html="formatContainerNumber(invoice.container)">
                  </span>
                </td>
                <td
                  class="text-dark"
                  :data-testid="`${id}__tr-${index}__td--container_fill`"
                >
                  <span v-html="formatContainerFill(invoice.container)"> </span>
                </td>
                <td
                  class="text-dark"
                  :data-testid="`${id}__tr-${index}__td--container_specification`"
                >
                  <span
                    v-html="formatContainerSpecification(invoice.container)"
                  >
                  </span>
                </td>
                <td
                  class="text-dark"
                  :data-testid="`${id}__tr-${index}__td--container_service`"
                >
                  <span v-html="formatContainerService(invoice.container)">
                  </span>
                </td>
                <td
                  class="text-dark"
                  :data-testid="`${id}__tr-${index}__td--total_price`"
                >
                  {{ $utility.convertToRupiah(invoice.total) }}
                </td>
                <td :data-testid="`${id}__tr-${index}__td--options`">
                  <dropdown-button
                    text=""
                    size="sm"
                    variant="gray"
                    type="outline"
                    additional_class="p-0"
                    caret="font-size-20 bx bx-dots-vertical-rounded"
                    :has_custom_action="true"
                    :ref="`${id}__tr-${index}__btn-option`"
                    :test_id="`${id}__tr-${index}__btn-option`"
                  >
                    <active-button
                      icon="ic-file-02"
                      icon_size="16"
                      icon_color="text-dark"
                      text="Lihat Invoice"
                      additional_class="border-0 w-100 text-left  p-2 bg-transparent"
                      align="rtl"
                      @click="
                        $router.push(`/transaction/invoice?id=${invoice.id}`)
                      "
                      :ref="`${id}__tr-${index}__btn-invoice`"
                      :test_id="`${id}__tr-${index}__btn-invoice`"
                      :id="`${id}__tr-${index}__btn-invoice`"
                    />
                    <active-button
                      icon="ic-file-search-02"
                      icon_size="16"
                      icon_color="text-dark"
                      text="Detail Transaksi"
                      additional_class="border-0 w-100 text-left  p-2 bg-transparent"
                      align="rtl"
                      @click="
                        $router.push(`/transaction/detail?id=${invoice.id}`)
                      "
                      :ref="`${id}__tr-${index}__btn-detail`"
                      :test_id="`${id}__tr-${index}__btn-detail`"
                      :id="`${id}__tr-${index}__btn-detail`"
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
    </div>
  </div>
</template>

<script>
import CONSTANT from "~/constants/corporate";
import { transactionMethods, subscriptionMethods } from "@/store/helperActions";
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
    id: "table-invoice",
    data: [],
    selected_id: "",
    modal: {
      modal_delete: false,
    },
    options: {
      vehicleType: CONSTANT.VEHICLE_TYPE(),
    },
    helper: {
      CORPORATE: {},
      isLoading: false,
      isError: false,
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
    filter: {
      async handler(value) {
        if (value) await this.passUpdatePagination(1);
      },
    },
  },
  async mounted() {
    this.helper.CORPORATE = JSON.parse(this.$utility.getCookie("corporate"));
    await this.processGetCorporate();
    await this.processGetData();
  },
  methods: {
    getCorporateDetail: subscriptionMethods.getCorporateDetail,
    getCorporateTransaction: transactionMethods.getCorporateTransaction,

    passErrorToParent(error) {
      this.$emit("error", { state: true, message: error });
    },

    passEditToParent(data) {
      this.$emit("edit", data);
    },

    async passUpdatePagination(page) {
      this.pagination.current_page = page;
      await this.processGetData();
    },

    setPayloadGet() {
      let payload = {
        filter: [
          {
            key: "corporate_id",
            value: this.helper.CORPORATE.id,
          },
        ],
        pagination: {
          current_page: this.pagination.current_page,
          per_page: this.pagination.per_page,
        },
      };
      if (this.filter.dateRange.length > 0) {
        payload.filter.push({
          key: "range",
          value: `${this.filter.dateRange[0]}_${this.filter.dateRange[1]}`,
        });
      }
      if (this.filter.value !== "") {
        payload.filter.push({
          key: this.filter.type,
          value: this.filter.value,
        });
      }
      if (this.filter.qr) {
        //
      }
      return payload;
    },

    processDataContainer(transactionItems) {
      let container = [];
      let subTotal = 0;
      let serviceTax = 0;
      let serviceFee = 0;
      let total = 0;
      transactionItems.map((opt) => {
        if (
          container
            .map((finder) => finder.container_code)
            .indexOf(opt.transaction_data.container_code) > -1
        ) {
          const idx = container
            .map((finder) => finder.container_code)
            .indexOf(opt.transaction_data.container_code);
          container[`${idx}`].data.push(opt);
          container[`${idx}`].total += parseInt(opt.price);
        } else {
          container.push({
            container_code: opt.transaction_data.container_code,
            data: [opt],
            total: parseInt(opt.price),
          });
        }
      });
      subTotal = parseInt(
        container.reduce((total, item) => total + item.total, 0)
      );
      serviceTax = parseInt(subTotal * 0.11);
      serviceFee = container.length * 100000;
      total =
        parseInt(this.helper.CORPORATE.admin_charge) +
        parseInt(subTotal) +
        parseInt(serviceTax) +
        parseInt(serviceFee);
      return {
        container: container,
        subTotal: subTotal,
        serviceTax: serviceTax,
        serviceFee: serviceFee,
        total: total,
      };
    },

    formatContainerNumber(container) {
      return `${container.map((opt) => opt.container_code).join(" <br />")}`;
    },

    formatContainerFill(container) {
      return `${container
        .map((opt) =>
          opt.data[0].transaction_data.container_fill === "FILL"
            ? "Muatan Terisi"
            : "Muatan Kosong"
        )
        .join(" <br />")}`;
    },

    formatContainerSpecification(container) {
      return `${container
        .map(
          (opt) =>
            `Tipe: ${opt.data[0].transaction_data.vehicle_size} | Jenis: ${opt.data[0].transaction_data.vehicle_type}`
        )
        .join(" <br />")}`;
    },

    formatContainerService(container) {
      return `${container
        .map((opt) => {
          if (opt.data.length > 1) {
            return opt.data.map((item) => item.product_detail.name).join(" + ");
          } else {
            return opt.data[0].product_detail.name;
          }
        })
        .join(" <br />")}`;
    },

    formatDataContainer(data) {
      try {
        this.data = data.map((opt) => {
          const { container, subTotal, serviceTax, serviceFee, total } =
            this.processDataContainer(opt.item_transactions);
          opt[`container`] = container;
          opt[`subTotal`] = subTotal;
          opt[`serviceTax`] = serviceTax;
          opt[`serviceFee`] = serviceFee;
          opt[`total`] = total;
          return opt;
        });
      } catch (error) {
        this.helper.isError = true;
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at formatDataOfficer TableOfficer`
        );
      }
    },

    async processGetCorporate() {
      this.helper.isLoading = true;
      this.helper.isError = false;
      try {
        const payload = {
          id: this.helper.CORPORATE.id,
        };
        const data = await this.getCorporateDetail(payload);
        this.helper.CORPORATE = { ...data, service_fee: 100000 };
        this.helper.isLoading = false;
      } catch (error) {
        this.helper.isError = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetCorporate in FormPaymentMethod`
        );
        this.helper.isLoading = false;
      }
    },

    async processGetData() {
      this.helper.isError = false;
      this.helper.isLoading = true;
      try {
        let payload = this.setPayloadGet();
        const { values, total_values } = await this.getCorporateTransaction(
          payload
        );
        this.formatDataContainer(values);
        this.pagination.total_data = total_values;
      } catch (error) {
        this.data = [];
        this.pagination.total_data = 0;
        this.helper.isError = true;
        this.passErrorToParent(error);
        this.$utility.setErrorContextSentry(error);
        this.$sentry.captureMessage(
          `${error.message} at processGetData in TableTransactionHistory`
        );
      }
      this.$emit("ready");
      this.helper.isLoading = false;
    },
  },
};
</script>

<style scoped>
.w-300-col {
  min-width: 300px !important;
}
.w-200-col {
  min-width: 200px !important;
}
.w-100-col {
  min-width: 100px !important;
}
</style>
